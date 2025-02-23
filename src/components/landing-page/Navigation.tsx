import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { MenuIcon } from 'lucide-react'

const NavtItems = () => {
    return (
        <>
            <Link href={"#features"} className='text-sm font-medium hover:underline underline-offset-4'>
                Features
            </Link>
            <Link href={"#pricing"} className='text-sm font-medium hover:underline underline-offset-4'>
                Pricing
            </Link>
            <Link href={"#faqs"} className='text-sm font-medium hover:underline underline-offset-4'>
                FAQs
            </Link>
            <Link href={"/login?state=signup"} className='text-sm font-medium hover:underline underline-offset-4'>
                <Button>
                    Sign Up
                </Button>
            </Link>
        </>
    )
}

const Navigation = () => {
    return (
        <div className='w-full bg-background/60 backdrop-blur-md fixed top-0 px-8 py-4 z-50 shadow-xl overflow-hidden'>
            <header className='container mx-auto flex items-center'>
                <Logo />
                <nav className='ml-auto md:flex hidden items-center justify-center gap-6'>
                    <NavtItems />
                </nav>
                <div className='ml-auto md:hidden overflow-hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <MenuIcon className='h-6 w-6' strokeWidth={1.5} />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetTitle className='sr-only'>Navigation</SheetTitle>
                            <nav className='flex flex-col gap-4 mt-12'>
                                <NavtItems />
                            </nav>
                        </SheetContent>

                    </Sheet>
                </div>
            </header>
        </div>
    )
}

export default Navigation