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
  ]
}

export default NextAuth(authOptions)