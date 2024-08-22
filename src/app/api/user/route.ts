import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";


export async function POST(req: Request){
    try {
        const body = await req.json()
        const { email, username, password } = body;

        const checkExistingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(checkExistingEmail){
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name: username,
                password: await hash(password, 10)
            }
        });
        
        if (newUser) {
            return NextResponse.json({message: "User created successfully"}, {status: 201})
        }
        else {
            return NextResponse.json({message: "User creation failed"}, {status: 400})
        }


    } catch (error) {
        
    }
}
