export interface Post {
  ID: number;
  title: string;
  URL: string;
  excerpt: string;
  date: string;
  author: {
    ID: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string | boolean;
    login: string;
  };
  featured_image: string;
  content: string;
  tags: {
    [key: string]: {
      ID: number;
      name: string;
      slug: string;
    };
  };
  status: string;
  like_count: number;
  comment_count: number;
  slug: string;
}

export interface NewsProps {
  ids?: number[];
}
