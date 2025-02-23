"use client"
import React, { useState } from 'react'
import { AnimatedGradientText } from '../ui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Tables } from '@/datatypes.types'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { usePathname, useRouter } from 'next/navigation'
import { checkoutWithStripe, createStripePortal } from '@/lib/stripe/server'
import { getErrorRedirect } from '@/lib/helpers'
import { getStripe } from '@/lib/stripe/client'
import { toast } from 'sonner'


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


interface PricingProps {
    subscription: SubscriptionWithProduct | null
    user: User | null,
    products: ProductWithPrice[] | null,
    mostPopular: string,
    showInterval?: boolean,
    className?: string,
    activeProduct?: string
}


const renderPricingButton = ({
    subscription,
    user,
    product,
    mostPopular,
    price,
    handleStripeCheckout,
    handleStripePortalRequest,
}: {
    subscription: SubscriptionWithProduct | null
    user: User | null,
    product: ProductWithPrice | null,
    mostPopular: string,
    price: Price,
    handleStripeCheckout: (price: Price) => Promise<void>,
    handleStripePortalRequest: () => Promise<void>
}) => {

    if (user && subscription && subscription.prices?.products?.name?.toLowerCase().includes(product?.name?.toLowerCase() ?? "")) {
        return <Button className='mt-8 w-full font-semibold' onClick={handleStripePortalRequest} variant={product?.name?.toLowerCase().includes(mostPopular.toLowerCase()) ? "default" : "secondary"}>
            Manage Subscription
        </Button>
    }

    if (user && subscription) {
        return <Button className='mt-8 w-full font-semibold' onClick={handleStripePortalRequest} variant={"secondary"}>
            Switch Plan
        </Button>
    }




    if (user && !subscription) {
        return <Button className='mt-8 w-full font-semibold' onClick={() => handleStripeCheckout(price)} variant={product?.name?.toLowerCase().includes(mostPopular.toLowerCase()) ? "default" : "secondary"}>
            Subscribe
        </Button>
    }

    return (
        <Button className='mt-8 w-full font-semibold' onClick={() => handleStripeCheckout(price)} variant={"default"}>
            Subscribe
        </Button>
    )
}


const Princing = ({ products, mostPopular, subscription, user, showInterval = true, className, activeProduct = "" }: PricingProps) => {
    const router = useRouter();
    const currentPath = usePathname();
    const [billingInterval, setBillingInterval] = useState("month");

    const handleStripeCheckout = async (price: Price) => {


        if (!user) {
            return router.push("/login")
        }

        const { errorRedirect, sessionId } = await checkoutWithStripe(price, currentPath)

        if (errorRedirect) {
            return router.push(errorRedirect)
        }

        if (!sessionId) {
            return router.push(getErrorRedirect(currentPath, "An unknown error occurred.", "Please try again later or contact a system administrator."))
        }

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
    }

    const handleStripePortalRequest = async () => {
        toast.info("Redirecting to Stripe portal...")
        const redirectUrl = await createStripePortal(currentPath)
        return router.push(redirectUrl)
    }

    return (
        <section className={cn("max-w-7xl mx-auto py-16 px-8 flex flex-col", className)}>

            {
                showInterval && <div className='flex justify-center items-center space-x-4 py-8'>
                    <Label htmlFor='pricing-switch' className='font-semibold text-base'>Monthly</Label>
                    <Switch id="pricing-switch" checked={billingInterval === "year"} onCheckedChange={(checked) => setBillingInterval(checked ? "year" : "month")} />
                    <Label htmlFor='pricing-switch' className='font-semibold text-base'>Annually</Label>
                </div>
            }

            <div className='grid  grid-cols-1 md:grid-cols-3 place-items-center mx-auto gap-8 space-y-0'>
                {
                    products?.map((product, index) => {
                        const price = product.prices.find(price => price.interval === billingInterval)
                        if (!price) return null
                        const priceString = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format((price.unit_amount || 0) / 100)
                        return (
                            <div key={product.id} className={cn('border bg-background rounded-xl shadow-sm h-fit w-full divide-border border-border divide-y', product.name?.toLowerCase().includes(activeProduct!.toLowerCase()) ? "border-primary bg-background " : "border-border")}>
                                <div className='p-6'>
                                    <h2 className='text-2xl leading-6 font-semibold text-foreground flex items-center justify-between'>{product.name}  {
                                        product.name?.toLowerCase().includes(mostPopular.toLowerCase()) && <Badge className='border-border font-semibold'>Selected</Badge>
                                    }</h2>

                                    <p className='text-muted-foreground mt-4 text-sm'>
                                        {product.description}
                                    </p>
                                    <p className='mt-8'>
                                        <span className='text-4xl font-extrabold text-foreground'>{priceString}</span>
                                        <span className='text-base font-medium text-muted-foreground'>/{billingInterval}</span>
                                    </p>
                                    {
                                        renderPricingButton({
                                            subscription,
                                            user,
                                            product,
                                            mostPopular,
                                            price,
                                            handleStripeCheckout,
                                            handleStripePortalRequest
                                        })
                                    }

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Princing