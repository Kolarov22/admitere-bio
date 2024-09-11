import React from 'react'
import CourseCard from '@/components/CourseCard'
import { Course } from '@/types'
import { auth } from '@/auth'

const getCourses = async () => {
    const response = await fetch('http://localhost:3000/api/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

const CoursesPage = async () => {

  let courses : Course[] = await getCourses()

  return (
    <>
    
    <section className='container my-2'>
        <h2 className='text-2xl py-12 '>Available courses</h2>
        <div className='flex justify-center md:justify-between items-center flex-wrap gap-10 px-10'>
        {courses.map(course => <CourseCard key={course.id} {...course}/>)}
        </div>
    </section>
    </>
  )
}

export default CoursesPage