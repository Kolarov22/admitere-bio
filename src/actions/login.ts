"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";



export const login = async (values: z.infer<typeof loginSchema>) => {
    
    //Extra step of validation on the server

    const validatedSchema = loginSchema.safeParse(values);

    if (!validatedSchema.success) {
        NextResponse.json({
            error: validatedSchema.error.errors
        })
    }

    const { email, password } = values;

    try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/courses",
        })
        
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return {
                        error: "Invalid email or password"
                    }
                default:
                    return {
                        error: "An error occurred"
                    }
            }
        }

    }
    
}