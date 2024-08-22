"use client";

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from '@/schemas';
 
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
import { register } from "@/actions/register";
import GoogleLogin from "@/components/GoogleLogin";







const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    
  })
 
  
  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values).then(
        (response) => {
            if (response?.error) {
                setError(response.error)
            }
        }
    )
  }


  return (
    <div className="flex flex-col justify-center items-center drop-shadow mt-20">
            <Card className="w-[500px] p-8">
                <CardHeader className="text-center font-bold text-xl pb-12">Register Form</CardHeader>
                <CardContent> 
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
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
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            
                            <Button className="self-center bg-slate-900 hover:bg-slate-800 w-full  mt-5" type="submit">Register</Button>

                            <FormError message={error}></FormError>
                        </form>
                        
                    
                    </Form>

                    <GoogleLogin/>
                </CardContent>
                <Link className="text-sm p-4 flex justify-end" href="/login">Already have an account?
                 Click to log in.</Link>
            </Card>
        </div>
  )
}

export default RegisterForm