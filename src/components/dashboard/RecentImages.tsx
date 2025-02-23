"use client"
import { Database, Tables } from '@/datatypes.types';
import { createClient } from '@/lib/supabase/client';
import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const RecentImages = () => {
    const [images, setImages] = React.useState<Tables<"generated_images">[]>([]);

    const getImages = async (limit?: number) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return {
                error: "Unauthorized",
                success: false,
                data: null
            }
        }

        let query = supabase.from('generated_images').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }
        const { data, error, } = await query;

        if (error) {
            return {
                error: error.message || "Failed to get images",
                success: false,
                data: null
            }
        }

        const imageWithUrls = await Promise.all(
            data.map(async (image: Database["public"]["Tables"]["generated_images"]["Row"]) => {
                const { data: imageUrl } = await supabase.storage.from('generated_images').createSignedUrl(`${user.id}/${image.image_name}`, 3600);
                return {
                    ...image,
                    url: imageUrl?.signedUrl
                }
            })
        )

        return {
            error: null,
            success: true,
            data: {
                results: imageWithUrls
            }
        }
    }

    useEffect(() => {
        getImages().then(({ data }) => {
            if (!data) {
                return
            }
            setImages(data?.results)
        })
    }, [])

    if (images.length === 0) {
        return (
            <Card className='col-span-3'>
                <CardHeader>
                    <CardTitle>
                        Recent Generations
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex items-center justify-center'>
                    <p className='text-muted-foreground mt-16'>No images generated yet</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className='col-span-3'>
            <CardHeader>
                <CardTitle>
                    Recent Generations
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <Carousel

                    className="w-full"
                >
                    <CarouselContent>
                        {images.map((image: Tables<"generated_images">) => (
                            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className='space-y-2'>
                                    <div className={cn("relative overflow-hidden rounded-lg", image.height && image.width ? `aspect-[${image.width}/${image.height}]` : "aspect-square")}>
                                        <Image
                                            src={image.url}
                                            alt={image.image_name!}
                                            className="object-cover"
                                            width={image.width || 100}
                                            height={image.height || 100}
                                        />
                                    </div>
                                    <p className='text-sm text-muted-foreground line-clamp-2'>
                                        {image.prompt}
                                    </p>
                                </div>
                            </CarouselItem>
                        )).slice(0, 6)}
                    </CarouselContent>
                    <CarouselPrevious className='left-2' />
                    <CarouselNext className='right-2' />
                </Carousel>
                <div className='flex justify-end'>
                    <Link href="/images">
                        <Button variant={"ghost"}>View all images <ArrowRight className='ml-2 w-4 h-4' /></Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentImages