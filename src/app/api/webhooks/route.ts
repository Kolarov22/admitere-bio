import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { addCourses } from "@/actions/addCourses";
import { Course } from "@/types";


export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string) 
 

export async function POST(req: Request){

    const payload = await req.text()
    const sig = req.headers.get('stripe-signature') as string
       
   
    try {
        const event = stripe.webhooks.constructEvent(
            payload, sig, process.env.STRIPE_WEBHOOK_SECRET as string
        )

    const session = event.data.object as Stripe.Checkout.Session;
        
    switch (event.type) {
    case 'checkout.session.completed':
      const data = JSON.parse(session?.metadata?.data as string)
      // Then define and call a method to handle the successful session completion.
      // handleCheckoutSession(session);
        addCourses(data.products, data.userId)
        
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

        return NextResponse.json({received: true}, {status: 200})
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({received: false}, {status: 400})
    }
}