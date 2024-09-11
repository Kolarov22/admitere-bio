
import { Course } from "@/types"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req: Request){
   const { products, userId } = await req.json()
    const line_items = products.map((product: Course) => {
         return {
              price_data: {
                currency: 'ron',
                product_data: {
                     name: product.title,

                },
                unit_amount: product.price*100
              },
              quantity: 1
         }
    })

    try {
     const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/?success=true`,
        cancel_url: `${req.headers.get('origin')}/?canceled=true`,
        metadata: {
          data: JSON.stringify({userId, products})
        }
    })

     return Response.json({id : session.id}, {status: 200})
    } catch (error) {
        console.log(error)
        return Response.json({error: 'Something went wrong'}, {status: 400})
    }

    



}