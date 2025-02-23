"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { CreditCardIcon, PlusIcon, Wand2, Wand2Icon } from 'lucide-react'

const QuickActions = () => {
    return (
        <Card className='h-[300px] '>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Quickly access your most important actions</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <Button asChild className='w-full'>
                    <Link href={"/image-generation"}>
                        <Wand2Icon className='h-4 w-4 ' />
                        <span className='ml-2'>Generate Image</span>
                    </Link>
                </Button>
                <Button asChild className='w-full' variant={"destructive"}>
                    <Link href={"/model-training"}>
                        <PlusIcon className='h-4 w-4 ' />
                        <span className='ml-2'>Train New Model</span>
                    </Link>
                </Button>
                <Button asChild className='w-full' variant={"secondary"}>
                    <Link href={"/billing"}>
                        <CreditCardIcon className='h-4 w-4 ' />
                        <span className='ml-2'>Billing</span>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default QuickActions