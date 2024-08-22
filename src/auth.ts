import NextAuth, { CredentialsSignin } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import prisma  from "@/lib/prisma"
import Google from "next-auth/providers/google"
import { encode, decode } from 'next-auth/jwt';

import { compare } from "bcryptjs"
import { ZodError } from "zod"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  jwt: { encode, decode },
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })
    ,Credentials({
    credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
 
          const email = credentials.email as string | undefined
          const password = credentials.password as string | undefined

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

 
 
        // logic to verify if the user exists
        const user = await prisma.user.findFirst({
            where: {
              email,
            },
        })
 
        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        

        const isMatched = await compare(password, user.password)
 
          // return JSON object with the user data
          if (isMatched) {
            return user
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }

        return null
      }
  })],

   pages: {
    signIn: "/login",
    signOut: "/",
  } 
})