export interface SessionUser {
  // TODO: Define SessionUser type
  [x: string]: string | undefined | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token: string;
}

export interface Session {
  user?: SessionUser;
  accessToken?: string;
}
