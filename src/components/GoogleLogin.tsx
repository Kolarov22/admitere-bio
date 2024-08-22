"use client";

import React from 'react'
import {signIn} from "next-auth/react";

import { Button } from "@/components/ui/button"
import {FcGoogle} from 'react-icons/fc'

const GoogleLogin = () => {
 function handleGoogleLogin() {
    signIn("google", 
        {callbackUrl: '/courses'}
    )

  } 

  return (
    <div className='my-5'>
    <span className='text-sm text-gray-400 p-5 flex justify-center'> or</span>
    <Button className="self-center bg-slate-900 hover:bg-slate-800 w-full" onClick={handleGoogleLogin}>Login with Google<FcGoogle className="w-5 h-5 ml-2"/></Button>
    </div>
  )
}

export default GoogleLogin