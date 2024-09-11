'use client';
import { ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {X} from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { getSession } from 'next-auth/react';
import { addCourses } from '@/actions/addCourses';
import { useState, useEffect, useTransition } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CartPage = () => {
  const [isPending, startTransition] = useTransition()  
  const data = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const [userId, setUserId] = useState<string>()
  
  useEffect(() => {
        const getUserId = async () => {
        const session = await getSession()
        if (session?.user) {
            setUserId(session.user.id)
        }
        }
        getUserId()
   }, [])

   if(userId === undefined){
    return 
  }



  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({products: data, userId: userId!})
    })
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
   
  }



  return (
    <section className='flex flex-col items-center mt-40 mb-20'>
        <h1 className='text-3xl font-bold flex items-center py-10'>My cart <ShoppingBasket className='ml-3' size={40}/></h1>
        <div className='container py-10 '>
            <table className='w-full text-center'>
                <thead className='my-3'>
                    <tr className=''>
                        <th>Course</th>
                        <th>Price</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody className='border-y-2'>
                    {data.map((item) => {
                        return (
                            <tr key={item.id} className='py-8'>
                                <td className='p-8'>{item.title}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Button onClick={() => removeFromCart(item)} variant='destructive' className=''><span className='flex'>Remove item <X size={20} className='ml-1'/></span></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='flex justify-end gap-5 mt-20 items-center'>
                <h2 className='text-2xl font-bold'>Total: ${data.reduce((acc, item) => acc + item.price, 0)}</h2>
                <Button onClick={handleCheckout} disabled={isPending} className='w-40 h-10'>Checkout</Button>
            </div>
        </div>
    </section>
  )
}

export default CartPage