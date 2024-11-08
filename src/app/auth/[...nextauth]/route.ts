import axios from "axios";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configuring authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // The logic of the last login step. Returns either an object representing
        // a user or value that is false/null if the credentials are invalid.
        try {
          const loginResponse = await axios.post(
            process.env.LOGIN_STEP03_URL!,
            credentials
          );

          if (loginResponse.status === 200) {
            return {
              username: loginResponse.data.username,
              id: loginResponse.data.id,
              token: loginResponse.data.token,
              first_login: loginResponse.data.first_name === null,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/", // Custom login page
    error: "/auth/error", // Custom error page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
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
