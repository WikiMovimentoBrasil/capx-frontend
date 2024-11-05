import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
