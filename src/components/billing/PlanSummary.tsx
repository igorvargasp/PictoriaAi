import { Tables } from '@/datatypes.types';
import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { User } from '@supabase/supabase-js';
import PricingSheet from './PricingSheet';


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


interface PlanSummaryProps {
    subscription: SubscriptionWithProduct | null
    user: User | null,
    products: ProductWithPrice[] | null
    credits: Tables<'credits'> | null
}



const PlanSummary = ({
    subscription,
    user,
    products,
    credits
}: PlanSummaryProps
) => {

    if (!subscription || subscription.status !== "active") {
        return <Card className='max-w-5xl'>
            <CardContent className='px-5 py-4'>
                <h3 className='pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2'>
                    <span>Plan Summary</span>
                    <Badge variant={"secondary"} className='bg-primary/10'>No Plan</Badge>
                </h3>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between pb-1'>
                            <span className='font-normal text-muted-foreground ml-1 lowercase'>
                                Image Generation Credits left
                            </span>
                            <span className='font-medium'>
                                0 remaining
                            </span>

                        </div>
                        <div className='mb-1 flex items-end'>
                            <Progress value={0} className='w-full h-2' />
                        </div>
                    </div>
                    <div className='col-span-5 flex flex-col pr-12'>
                        Other Details
                    </div>
                </div>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between pb-1'>
                            <span className='font-normal text-muted-foreground ml-1 lowercase'>
                                Model Training Credits left
                            </span>
                            <span className='font-medium'>
                                0 remaining
                            </span>

                        </div>
                        <div className='mb-1 flex items-end'>
                            <Progress value={0} className='w-full h-2' />
                        </div>
                    </div>
                    <div className='col-span-full flex flex-col'>
                        Please upgrade your plan to access all features
                    </div>
                </div>
            </CardContent>
            <CardFooter className='border-t border-border px-4 py-3'>
                <span className='flex ml-auto flex-row'>
                    <PricingSheet subscription={subscription} user={user} products={products} />
                </span>
            </CardFooter>
        </Card>
    }
    console.log(subscription)

    const { products: product, unit_amount, currency } = subscription.prices ?? {}
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency!,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format((unit_amount || 0) / 100)

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(subscription.current_period_end));


    const modelTrainingCount = credits?.model_training_count || 1
    const maxModelTrainingCount = credits?.max_model_training_count || 1
    const imageGenCount = credits?.image_generation_count || 300
    const maxImageGenCount = credits?.max_image_generation_count || 300





    return (
        <Card className='max-w-5xl'>
            <CardContent className='px-5 py-4 pb-8'>
                <h3 className='pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2'>
                    <span>Plan Summary</span>
                    <Badge variant={"secondary"} className='bg-primary/10'>{product?.name} Plan</Badge>
                </h3>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between  items-center'>
                            <span className='font-semibold text-base'>
                                {imageGenCount}/{maxImageGenCount}
                            </span>
                            <span className='font-normal text-muted-foreground ml-1 lowercase'>
                                Image Generation Credits
                            </span>

                        </div>
                        <div className='mb-1 flex items-end'>
                            <Progress value={imageGenCount / maxImageGenCount * 100} className='w-full h-2' />
                        </div>
                    </div>
                    <div className='col-span-5 flex flex-col pr-12'>
                        Other Details
                    </div>
                </div>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-span-5 flex flex-col pr-12'>
                        <div className='flex-1 text-sm font-normal flex w-full justify-between items-center'>
                            <span className='font-semibold text-base'>
                                {modelTrainingCount}/{maxModelTrainingCount}
                            </span>
                            <span className='font-normal text-muted-foreground ml-1 lowercase'>
                                Model Training Credits
                            </span>


                        </div>
                        <div className='mb-1 flex items-end'>
                            <Progress value={modelTrainingCount / maxModelTrainingCount * 100} className='w-full h-2' />
                        </div>
                    </div>
                    <div className='col-span-3 flex flex-row justify-between flex-wrap'>
                        <div className='flex flex-col pb-0'>
                            <div className='text-sm font-normal'>
                                Price/Month
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                {priceString}
                            </div>
                        </div>
                        <div className='flex flex-col pb-0'>
                            <div className='text-sm font-normal'>
                                Included Credits
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                {maxImageGenCount}
                            </div>
                        </div>
                        <div className='flex flex-col pb-0'>
                            <div className='text-sm font-normal'>
                                Renewal Date
                            </div>
                            <div className='flex-1 pt-1 text-sm font-medium'>
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default PlanSummary