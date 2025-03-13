import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from "@/lib/prismadb";
import { compare } from "bcryptjs";
import { Role } from "@prisma/client";
import { JWT } from "next-auth/jwt";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req): Promise<User> {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          throw new Error(
            "No se encontró ningún usuario con ese correo. Por favor, regístrese."
          );
        }
        const checkPassword = await compare(
          credentials?.password ?? "",
          user.password ?? ""
        );
        if (!checkPassword) {
          throw new Error("La contraseña no coincide con esta cuenta.");
        }
        return user;
      },
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    jwt: async (params) => {
      const user = await prisma.user.findUnique({
        where: {
          email: params.token.email as string,
        },
        select: {
          role: true,
        },
      });
      params.token.role = user?.role ?? "";
      // if (params.isNewUser === true) {
      if (params.trigger === "signUp") {
        const users = await prisma.user.findMany();
        if (users.length === 1) {
          await prisma.user.update({
            where: { email: params.token.email as string },
            data: { role: "Admin" },
          });
        }
        // emailNewUser(params.token.name as string, params.token.email as string);
        // emailToUserAdmin(
        //   params.token.name as string,
        //   params.token.email as string
        // );
      }
      return params.token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
