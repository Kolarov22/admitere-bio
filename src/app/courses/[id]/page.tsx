'use client';
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/use-toast';
import { Course } from '@/types';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';


interface CoursePageProps {
    params: {
        id: string
    }
}

const CoursePage = ({params} : CoursePageProps) => {

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/courses', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    setCourses(data);
    setLoading(false)
  };
  
  useEffect(() => {
    fetchData();
  }, []);
 

  const { toast } = useToast()
  const addToCart = useCartStore(state => state.addToCart) 
  const currentCourse = courses.find((course : Course) => course.id === Number(params.id))
  const inCart = useCartStore(state => state.cart.find(product => product.id === Number(params.id)))

  const handleProductAdd = () => {
    if(!currentCourse){
      toast({description: 'Could not add your course to the cart.', variant: 'destructive'})
      return
    } 
    else if (inCart){
      toast({description: 'Course already in cart.', variant: 'destructive'})
      return
    }

    addToCart(currentCourse)
    toast({description: 'Course added to cart.'})

  }

  return (
    <section className='h-full sm:min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 '>
        <div className='container flex flex-col justify-around items-center bg-slate-700 text-white gap-6 md:gap-3 p-3'>
            {
              loading ? (<div className='flex justify-center items-center'><LoadingSpinner/></div>) : 
              (
                <>   
                <h1 className='text-3xl text-center'>{currentCourse ? currentCourse.title : "Loading..."}</h1>
                <p className='container text-pretty text-center'> {currentCourse ? currentCourse.description : "Loading"}</p>
                <div className='flex justify-center items-center flex-col sm:flex-row gap-5'>
                <h2 className='text-center'>Topics you will learn about</h2>
                <ul className='flex gap-2 justify-evenly p-3'>
                  <li><Badge className='p-3 text-pretty cursor-pointer'>Topic 1</Badge></li>
                  <li><Badge className='p-3 text-pretty cursor-pointer'>Topic 2</Badge></li>
                  <li><Badge className='p-3 text-pretty cursor-pointer'>Topic 3</Badge></li>
                </ul>

                  
                </div>
                <p>{currentCourse ? `$${currentCourse.price}` : "Loading..."}</p>
                <Button onClick={() => handleProductAdd()} asChild className='w-[250px] flex justify-center items-center bg-slate-100 hover:bg-slate-200 text-black font-semibold'><span className='font-bold'>Buy now <ShoppingCart className='ml-2'/> </span>
                </Button>
                </>
              )
            }
        </div>
        <div className='container flex flex-col justify-center items-center bg-gray-200 text-black gap-3 py-5'>
          <h2 className='text-2xl font-bold'>Preview the PDF</h2>
          <iframe src="/assets/sdm1.pdf" frameBorder={0} width={600} height={750}className='border-0 container'></iframe>
        </div>
    </section>
  )
}

export default CoursePage