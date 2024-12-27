import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          if (
            !credentials?.token ||
            !credentials?.id ||
            !credentials?.username
          ) {
            console.error(
              "NextAuth authorize - Missing user data in credentials"
            );
            throw new Error("Missing user data in credentials");
          }

          // Aqui não precisamos fazer nova chamada ao backend
          // pois já temos os dados do usuário
          return {
            id: credentials.id,
            name: credentials.username,
            token: credentials.token,
            first_login: credentials.first_login,
          };
        } catch (error: any) {
          console.error("NextAuth authorize error:", error);
          throw error;
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
  debug: true,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
