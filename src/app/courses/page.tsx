import React from 'react'
import CourseCard from '@/components/CourseCard'
import { courses } from '../data/courses'


const CoursesPage = () => {
  return (
    <>
    
    <section className='container my-2'>
        <h2 className='text-2xl py-12 '>Available courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-9'>
        {courses.map(course => <CourseCard key={course.id} course={course}/>)}
        </div>
    </section>
    </>
  )
}

export default CoursesPage