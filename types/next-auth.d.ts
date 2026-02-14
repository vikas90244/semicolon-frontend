// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // Extend the session to include your backend token
    accessToken?: string;
    idToken?: string;
    user: {
      // Add other user properties if needed
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    // Extend the User object to allow passing the token from signIn
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Extend the JWT to store the tokens
    accessToken?: string;
    idToken?: string;
  }
}
