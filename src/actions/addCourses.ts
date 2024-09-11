"use server"
import { Course } from "@/types"
import prisma from "@/lib/prisma"


export const addCourses = async ( courses: Course[],  userId: string ) => {
    const courseEnrollments = courses.map(course => {
        return {
            userId: userId,
            courseId: Number(course.id)
        }
    })
    

    await prisma.courseEnrollment.createMany({
        data: courseEnrollments
    })

    console.log(courses)
}