import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request){
    try {
        
    const courses = await prisma.course.findMany({
      include: {
        users: {
          /* include: {
            user: true, // Fetch the user details associated with the enrollment
          }, */
        },
      },
    });

        return NextResponse.json(courses, {status: 200})
    } 
    catch (error) {
        console.error('Error fetching courses:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

//not in use, only for testing purposes

/* export async function POST(req: Request){
    try {
        const body = await req.json()
        const { title, description, price, image } = body;

        
        
        if (true) {
            return NextResponse.json({message: "Course created successfully"}, {status: 201})
        }
        else {
            return NextResponse.json({message: "Course creation failed"}, {status: 400})
        }
    }
    catch (error) {
        console.error('Error fetching courses:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} */