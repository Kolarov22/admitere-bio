import React from 'react'

import { Course } from '@/types'

import { Card, CardHeader, CardFooter, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'

import { MoveRight } from 'lucide-react'

const BoughtCourseCard = (course: Course) => {
  return (
    <Card className='drop drop-shadow min-w-80 min-h-32 py-5'>
        <CardHeader className='text-center'>
            <CardTitle className='text-3xl uppercase'>{course.title}</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
            <p className=''>{course.description}</p>
        </CardContent>
        <CardFooter className='flex justify-center mt-5'>
            <Button size="lg" asChild><Link href={`/my-courses/${course.id}`}>See full course <MoveRight className='ml-1'/></Link></Button>
        </CardFooter>
    </Card>
  )
}

export default BoughtCourseCard