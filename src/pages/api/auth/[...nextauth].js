import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configuring authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, request) {
        // The logic of the last login step. Returns either an object representing
        // a user or value that is false/null if the credentials are invalid.
        const loginResponse = await axios.post(process.env.LOGIN_STEP03_URL, credentials);
        if (loginResponse.status == 200) {
          const user = {
            username: loginResponse.data.username,
            token: loginResponse.data.token,
            first_login: (loginResponse.data.first_name === null ? true : false)
          }
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  // Adding callbacks
  // https://github.com/nextauthjs/next-auth/discussions/2762
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    signingKey: process.env.NEXTAUTH_JTW_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
}

export default NextAuth(authOptions)