'use client';
import React from 'react'
import { ShoppingBasket} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {X} from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'


const CartPage = () => {
  const data = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)


  return (
    <section className='flex flex-col items-center my-32'>
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
                <Button  className='w-40 h-10'>Checkout</Button>
            </div>
        </div>
    </section>
  )
}

export default CartPage