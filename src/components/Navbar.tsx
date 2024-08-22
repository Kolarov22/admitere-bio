import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { auth, signIn, signOut} from '@/auth'


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  const SignInButton = () => {
    return (
        <Button asChild variant="link" className='text-gray-200' type='submit'>
            <Link href='/login'>Sign in</Link>
        </Button>
    )
  }

  return (
    <nav className='flex justify-between items-center px-8 bg-slate-900 text-white h-20 w-full'>

        <Image src='/next.svg' alt="Logo" height={48} width={48} className='text-white'></Image>
        
        <div className='flex flex-row gap-3'>
            <Button asChild variant="link" className='text-gray-200'>
                <Link href='/'>Home</Link>
            </Button>

            <Button asChild variant="link" className='text-gray-200'>
                <Link href="/courses">Courses</Link>
            </Button>

            {
                user ? (<> <Button asChild variant="link" className='text-gray-200'>
                <Link href="/cart">Cart</Link>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                    <AvatarImage src={user.image ? user.image : "#"}></AvatarImage>
                    <AvatarFallback className='bg-gray-300 '>HM</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel className='text-center'>Hi, {user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem><Link href='/account'>Account</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href='/my-courses'>Courses</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <form action={async () => {
                            "use server";
                            await signOut();
                            }}>
                                <button type='submit'>Sign out</button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu> </>) : <SignInButton />
            }

        </div>
    </nav>
  )
}

export default Navbar