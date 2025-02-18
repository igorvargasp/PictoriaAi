"use client";
import React from 'react'
import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import useGeneratedStore from '@/store/useGeneratedStore'

// const images = [
//     {
//         src: "/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg",
//         alt: "Abstract Curves and Colors"
//     },
//     {
//         src: "/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg",
//         alt: "Confident Businesswoman on Turquoise Backdrop"
//     },
//     {
//         src: "/hero-images/Confident Woman in Urban Setting.jpeg",
//         alt: "Confident Woman in Urban Setting"
//     },
//     {
//         src: "/hero-images/Futuristic Helmet Portrait.jpeg",
//         alt: "Futuristic Helmet Portrait"
//     }
// ]

const GeneratedImages = () => {
    const { loading, images } = useGeneratedStore();
    console.log(images)

    if (images?.length === 0) {
        return (
            <Card className='w-full max-w-2xl bg-muted'>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                    <span className='text-2xl'>No images generated yet</span>
                </CardContent>
            </Card>
        )
    }

    return (
        <Carousel
            className="w-full max-w-2xl"
        >
            <CarouselContent>
                {images?.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="flex relative items-center justify-center rounded-lg overflow-hidden aspect-square">
                            <Image src={image.url} alt={"Generated Images"} className="w-full h-full object-cover" fill />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default GeneratedImages