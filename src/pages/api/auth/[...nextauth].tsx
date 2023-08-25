// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/prismadb";
// import { NextApiRequest, NextApiResponse } from "next";

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       async authorize(credentials: { email: string }, req: NextApiRequest) {
//         const result = await prisma.user.findFirst({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!result) {
//           throw new Error("No existe ningún email con esas características");
//         }

//         return result;
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt(token, user) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         // ...otros datos que quieras agregar al token JWT
//       }
//       return token;
//     },
//     async session(session, token) {
//       session.user = token;
//       return session;
//     },
//   },
// });