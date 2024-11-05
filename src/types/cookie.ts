export type CookieValue =
  | {
      value: string;
      name: string;
      path: string;
    }
  | undefined;

export type DarkModeCookie =
  | {
      value: string;
    }
  | string;
