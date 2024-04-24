import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configuring authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, request) {
        // Return null if user data could not be retrieved
        return null
      }
    })
  ]
}

export default NextAuth(authOptions)