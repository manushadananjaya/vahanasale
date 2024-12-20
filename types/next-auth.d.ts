// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      username?: string;
      email: string;
      phone?: string; 
      city?: string;
      district?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    username?: string;
    email: string;
    phone?: string; 
    city?: string;
    district?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username?: string;
    email: string;
    phone?: string; 
    city?: string;
    district?: string;
  }
}
