import React from 'react'
import Link from 'next/link'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

import { Button } from './ui/button'

import { Course } from '@/types'


const CourseCard = (course : Course) => {
  return (
    <Card className='max-w-[700px] min-w-[300px] drop-shadow py-5'>
        <CardHeader>
            <CardTitle className='text-center text-3xl uppercase'>{course.title}</CardTitle>
        </CardHeader>

        <CardContent className='text-center'>
            <p>{course.description}</p>
        </CardContent>

        <CardFooter className='flex items-center justify-center gap-10 mt-5'>
            <span className='font-extrabold'>${course.price}</span>
            <Button asChild className='bg-slate-800 hover:bg-slate-950 text-white' ><Link href={`/courses/${course.id}`}>See more</Link></Button>
        </CardFooter>
    </Card>
  )
}

export default CourseCard