"use server";
import * as z from "zod";
import { registerSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const  register = async (values: z.infer<typeof registerSchema>) => {
    
    //Extra step of validation on the server

    const validatedSchema = registerSchema.safeParse(values);

    if (!validatedSchema.success) {
        NextResponse.json({
            error: validatedSchema.error.errors
        })
    }

   const { email, username, password } = values;
   const hashedPassword = await hash(password, 10);

   const existingUser = await prisma.user.findUnique({
    where: {
        email,
    }
   })

   if (existingUser){
    return {
        error: "User already exists"
    }
   }

    const user = await prisma.user.create({
         data: {
              email,
              name: username,
              password: hashedPassword
         }
    })

    redirect("/login")


}