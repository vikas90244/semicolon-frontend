import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const BACKEND_URI = process.env.BACKEND_URI!;
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { access_token, id_token } = account;

        try {
          const response = await axios.post(
            `${BACKEND_URI}/api/social/login/google/`,
            {
              access_token: access_token,
              id_token: id_token,
            }
          );

          console.log("this is response from the backend: ", response);
          const backendAccessToken = response.data.access_token || response.data.key;

          if (backendAccessToken) {
            user.accessToken = backendAccessToken;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Backend login error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;

      return session;
    },
  },
};
