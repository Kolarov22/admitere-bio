'use client';
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/components/ui/use-toast';
import { courses } from '@/app/data/courses'

interface CoursePageProps {
    params: {
        id: string
    }
}

const CoursePage = ({params} : CoursePageProps) => {
  const { toast } = useToast()
  const addToCart = useCartStore(state => state.addToCart) 
  const course = courses.find(course => course.id === params.id)
  const inCart = useCartStore(state => state.cart.find(product => product.id === params.id))

  const handleProductAdd = () => {
    if(!course){
      toast({description: 'Could not add your course to the cart.', variant: 'destructive'})
      return
    } 
    else if (inCart){
      toast({description: 'Course already in cart.', variant: 'destructive'})
      return
    }

    addToCart(course)
    toast({description: 'Course added to cart.'})

  }

  return (
    <section className='h-full sm:min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 '>
        <div className='container flex flex-col justify-around items-center bg-slate-700 text-white gap-6 md:gap-3 p-3'>
            <h1 className='text-3xl text-center'>{`Course ${params.id}`}</h1>
            <p className='container text-pretty text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui culpa iusto, porro ab praesentium dicta dolores laudantium distinctio commodi officiis cumque enim harum quaerat, natus fuga. Eos voluptatem ipsam quaerat cupiditate eius incidunt dicta necessitatibus voluptate? Itaque ex odit quasi dolor ea quo quos doloribus eum molestias nemo laboriosam cumque laborum aut sint, temporibus voluptatem culpa praesentium incidunt corporis porro repellat ipsa unde sequi repellendus! Quidem id aperiam consequatur dolore. Aspernatur dolorem nam numquam, cumque beatae nesciunt ipsam ea consequuntur voluptatibus amet. Voluptatum numquam quidem maiores. Excepturi voluptas culpa minus architecto distinctio, rerum veritatis sint ducimus, alias assumenda repellat sit.
            </p>
            <div className='flex justify-center items-center flex-col sm:flex-row gap-5'>
              <h2 className='text-center'>Topics you will learn about</h2>
              <ul className='flex gap-2 justify-evenly p-3'>
                <li><Badge className='p-3 text-pretty'>Topic 1</Badge></li>
                <li><Badge className='p-3 text-pretty'>Topic 2</Badge></li>
                <li><Badge className='p-3 text-pretty'>Topic 3</Badge></li>
              </ul>
            </div>

            <Button onClick={() => handleProductAdd()} asChild className='w-[250px] flex justify-center items-center bg-slate-100 hover:bg-slate-200 text-black font-semibold'><span className='font-bold'>Buy now <ShoppingCart className='ml-2'/> </span>
            </Button>



        </div>
        <div className='container flex flex-col justify-center items-center bg-gray-200 text-black gap-3 py-5'>
          <h2 className='text-2xl font-bold'>Preview the PDF</h2>
          <iframe src="/assets/sdm1.pdf" frameBorder={0} width={600} height={750}className='border-0 container'></iframe>
        </div>
    </section>
  )
}

export default CoursePage