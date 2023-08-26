import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      address: string
      email: string
      image: string
      username: string
      password: string
      name: string
      role: string
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
