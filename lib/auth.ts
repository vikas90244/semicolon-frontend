import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { BACKEND_URI } from "./uri";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      return account?.provider === "google"; 
    },

    async jwt({ token, account }) {
      if (account?.provider === "google") {
        try {
          const response = await axios.post(
            `${BACKEND_URI}/api/social/login/google/`,
            {
              access_token: account.access_token,
              id_token: account.id_token,
            }
          );

          console.log("Django Auth Response: ", response.data);
          
          const backendAccessToken = response.data.access_token || response.data.access;

          if (backendAccessToken) {
            token.accessToken = backendAccessToken;
          }
        } catch (error) {
          console.error("Failed to exchange token with Django:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};