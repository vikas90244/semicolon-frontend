import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Add your callbacks here exactly as before
  callbacks: {
      async jwt({ token, account }) {
          console.log("callback jwt is waked");
          console.log("token: ", token);
          console.log("account: ", account);
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
      async session({ session, token }) {
        console.log("session is: ", session);
        console.log("token is: ", token);
      // @ts-ignore
      session.idToken = token.idToken
      return session
    }
  }
}
