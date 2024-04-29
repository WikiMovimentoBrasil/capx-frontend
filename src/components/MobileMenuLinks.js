import NextLink from "next/link";

export default function MobileMenuLinks({ session }) {
  const menuDataLoggedIn = [
    { title: "My Profile", to: "/profile" },
    { title: "Skills", to: "/skills" },
    { title: "Events", to: "/events" },
  ];

  // User is logged in
  if (session) {
    return (
      <div className="flex flex-wrap w-10/12 text-2xl mx-auto space-y-4">
        {menuDataLoggedIn.map((item, index) => {
          return (
            <NextLink
              href={item.to}
              className="w-full cursor-pointer border-b py-3"
            >
              {item.title}
            </NextLink>
          )
        })}
      </div>
    )
  }
}