"use client";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { z } from "zod"
import { loginSchema } from '@/schemas';
import { login } from "@/actions/login";

 
import { Button } from "@/components/ui/button"
import FormError from "@/components/FormError"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import GoogleLogin from "@/components/GoogleLogin"

 


const LoginForm = () => {

  const router = useRouter()

  const [error, setError] = useState<string>('')

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    
  })
 
  
  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
     login(values).then(
        (response) => {
            if (response?.error) {
                setError(response.error)
            }
        }
    )
    })
    router.refresh();


  }

  

  
    return (
        <div className="flex flex-col justify-center items-center drop-shadow">
            <Card className="w-[500px] p-8">
                <CardHeader className="text-center font-bold text-xl pb-12">Login Form</CardHeader>
                <CardContent> 
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input placeholder="email" disabled={isPending} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type ="password" placeholder="password" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button className="self-center bg-slate-900 hover:bg-slate-800 w-full mt-5" type="submit" disabled={isPending}>Login</Button>
                            

                            <FormError message={error}></FormError>
                        </form>
                        
                        

                    </Form>

                    <GoogleLogin />
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm