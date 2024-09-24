import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string } }){
    const { courseId } = params

    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                courseId: Number(courseId) 
                
            },
             include: {
                questions: true
            }
        })

        return NextResponse.json(quiz, {status: 200})
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}