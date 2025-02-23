"use client";
import React from 'react'
import { Tables } from '@/datatypes.types';
import { User } from '@supabase/supabase-js';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import Princing from './Pricing';


type Product = Tables<'products'>;
type Price = Tables<'prices'>;
type subscription = Tables<'subscriptions'>;

interface ProductWithPrice extends Product {
    prices: Price[]
}

interface PriceWithProduct extends Price {
    products: Product | null
}
interface SubscriptionWithProduct extends subscription {
    prices: PriceWithProduct | null
}


interface PricingSheetProps {
    subscription: SubscriptionWithProduct | null
    user: User | null,
    products: ProductWithPrice[] | null
}


const PricingSheet = ({ user, products, subscription }: PricingSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>
                    <Button variant={"outline"} className='w-full'>Upgrade</Button>
                </div>
            </SheetTrigger>
            <SheetContent className='max-w-full sm:max-w-[90vw] lg:max-w-[70vw] text-left w-full'>
                <SheetHeader>
                    <SheetTitle>Change subscription plan</SheetTitle>
                    <SheetDescription>
                        choose a plan that fits your needs and budget to continue using our service
                    </SheetDescription>
                </SheetHeader>
                <Princing user={user} products={products ?? []} subscription={subscription} mostPopular='pro' />
            </SheetContent>
        </Sheet>
    )
}

export default PricingSheet