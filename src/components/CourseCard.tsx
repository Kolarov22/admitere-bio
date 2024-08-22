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

interface CourseCardProps {
  course:{
    id: string,
    title: string, 
    description: string,
    price: number
  }
}


const CourseCard = ({course}:CourseCardProps) => {
  return (
    <Card className='max-w-[500px] mx-auto drop-shadow'>
        <CardHeader>
            <CardTitle className='text-center'>{course.title}</CardTitle>
        </CardHeader>

        <CardContent className='break-all'>
            <p>{course.description}</p>
        </CardContent>

        <CardFooter className='flex items-center justify-center gap-10'>
            <span className='font-extrabold'>{course.price}</span>
            <Button asChild className='bg-slate-800 hover:bg-slate-950 text-white' ><Link href={`/courses/${course.id}`}>See more</Link></Button>
        </CardFooter>
    </Card>
  )
}

export default CourseCard