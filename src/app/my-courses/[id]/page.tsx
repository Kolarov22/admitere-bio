"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Course } from '@/types'

import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface CoursePageProps {
    params: {
        id: string
    }
}

const CoursePage = ({params} : CoursePageProps) => {

  const [courses, setCourses] = useState<Course[]>([]);
  const pathName = usePathname()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const currentCourse = courses.find((course : Course) => course.id === Number(params.id))
  const releaseDate = new Date(currentCourse?.createdAt as string).toLocaleDateString()


  return !loading ? (
    <section className='mt-16'>
      <div className="text-center p-10">
        <h1 className="text-5xl font-bold uppercase">{currentCourse?.title}</h1>
        <p className="my-10">Released on: {releaseDate}</p>
        <p className="my-20 mx-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
          facilis incidunt voluptatibus vitae ratione dolorum non quos
          consectetur facere? Ullam provident temporibus voluptas quo cum harum
          impedit, pariatur a culpa molestias? Quaerat corrupti doloremque eius,
          iure dolor esse nisi dolorum laborum quod, molestias itaque
          voluptates. Beatae, ratione. Voluptatibus vitae delectus a totam quas
          alias quaerat tenetur porro dignissimos distinctio debitis minus est
          earum, possimus non optio nobis quis fugiat beatae doloribus
          assumenda? Tempora rerum tenetur alias iure, labore sed deleniti id
          aliquid illum explicabo modi velit placeat est asperiores voluptatibus
          distinctio ab. Saepe accusamus voluptatem dolorem officia. Pariatur,
          nihil minus?
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 md:gap-10">
        <Button asChild className="w-1/4 md:w-[250px] h-12">
          <Link href={`${pathName}/quiz`}>Take quiz</Link>
        </Button>
        <Button asChild className="w-1/4 md:w-[250px] h-12">
          <Link href={`${pathName}/materials`}>Read materials</Link>
        </Button>
      </div>
    </section>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  );

}

  export default CoursePage