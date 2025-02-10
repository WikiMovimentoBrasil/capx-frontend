import Image from "next/image";
import WikimediaIcon from "@/public/static/images/wikimedia_logo_black.svg";
import WikimediaIconWhite from "@/public/static/images/wikimedia_logo_white.svg";
import { useTheme } from "@/contexts/ThemeContext";
import { NewsProps, Post } from "@/types/news";
import { useEffect, useState } from "react";
import { useTagDiff } from "@/hooks/useTagDiff";
import { useSession } from "next-auth/react";
import { tagDiff } from "@/types/tagDiff";
import { useApp } from "@/contexts/AppContext";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const NewsSection = ({ ids }: NewsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useTheme();
  const { pageContent } = useApp();
  const { data: session } = useSession();
  const { fetchSingleTag } = useTagDiff(session?.user?.token);

  useEffect(() => {
    const fetchNews = async () => {
      if (!ids?.length || !session?.user?.token) return;
      try {
        setIsLoading(true);
        const tagsPromises = ids.map((id) => fetchSingleTag(id));
        const tagsResults = await Promise.all(tagsPromises);
        const validTags = tagsResults
          .filter(
            (tag): tag is NonNullable<typeof tag> =>
              tag !== undefined && tag !== null
          )
          .map((tag) => tag.tag);

        if (!validTags.length) {
          setPosts([]);
          return;
        }

        const allPosts = await Promise.all(
          validTags.map(async (tag) => {
            const formattedTag = tag.toLowerCase().replace(/\s+/g, "-");
            const url = `https://public-api.wordpress.com/rest/v1.1/sites/175527200/posts/?tag=${formattedTag}`;
            const response = await fetch(url);
            const data = await response.json();

            return data.posts || [];
          })
        );

        const combinedPosts = allPosts.flat();
        const uniquePosts = Array.from(
          new Map(combinedPosts.map((post) => [post.ID, post])).values()
        );

        setPosts(uniquePosts);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ids?.length) {
      fetchNews();
    }
  }, [ids, session?.user?.token]);

  if (isLoading) {
    return <div>{pageContent["edit-profile-loading-news"]}</div>;
  }

  return (
    <section className="w-full max-w-screen-xl py-8">
      <div className="flex flex-row flex pl-0 pr-[13px] py-[6px] items-center gap-[4px] rounded-[8px] mb-6">
        <div className="relative w-[20px] h-[20px] md:w-[48px] md:h-[48px]">
          <Image
            src={darkMode ? WikimediaIconWhite : WikimediaIcon}
            alt="Wikimedia"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2
          className={`font-[Montserrat] text-[14px] md:text-[24px] not-italic font-extrabold leading-[normal] ${
            darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
          }`}
        >
          {pageContent["edit-profile-news"]}
        </h2>
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide">
        {posts.map((post, index) => (
          <div
            key={index}
            className={`flex flex-col w-[350px] px-[12px] py-[24px] items-center gap-[12px] rounded-[16px] ${
              darkMode ? "bg-[#04222F]" : "bg-[#EFEFEF]"
            }`}
          >
            <div className="relative w-[300px] h-[200px] rounded-[16px] overflow-hidden">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover w-full h-full"
              />
            </div>
            <h1
              className={`text-center font-[Montserrat] text-[20px] font-bold not-italic leading-[normal] text-start ${
                darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
              }`}
            >
              {post.title}
            </h1>
            <div className="flex flex-row gap-2">
              <p
                className={`text-center font-[Montserrat] text-[16px] font-normal not-italic leading-[normal] text-start ${
                  darkMode ? "text-[#F6F6F6]" : "text-[#003649]"
                }`}
              >
                {dateFormatter.format(new Date(post.date))}
                &nbsp;por&nbsp;
                {post.author.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
