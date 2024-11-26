import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          if (
            !credentials?.oauth_token ||
            !credentials?.oauth_token_secret ||
            !credentials?.oauth_verifier
          ) {
            throw new Error("Missing required credentials");
          }

          const loginResponse = await axios.post(
            process.env.LOGIN_STEP03_URL!,
            {
              oauth_token: credentials.oauth_token,
              oauth_token_secret: credentials.oauth_token_secret,
              oauth_verifier: credentials.oauth_verifier,
            }
          );

          if (loginResponse.status === 200 && loginResponse.data) {
            return {
              username: loginResponse.data.username,
              id: loginResponse.data.id,
              token: loginResponse.data.token,
              first_login: loginResponse.data.first_name === null,
            };
          }
          throw new Error("Invalid response from authentication server");
        } catch (error: any) {
          console.error("Authorization error:", error.message);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
