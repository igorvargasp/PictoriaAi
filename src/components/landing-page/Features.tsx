import React from 'react'
import { AnimatedGradientText } from '../ui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { ImageIcon, Package2Icon, Palette } from 'lucide-react'
import dashboardImg from "@/public/dashboard-img.png"
import Image from 'next/image'


const featureList = [
    {
        title: 'AI-Powered Photos',
        description: 'Instantly transform your photos into high-quality, lifelike images with the power of AI. Whether you need fresh content for social media, professional shots for LinkedIn, or a fun set of images for personal project.',
        icon: <ImageIcon className='h-6 w-6' strokeWidth={1.5} />,
    },
    {
        title: 'Diverse Photo Packs at Your Fingertips',
        description: 'Say goodbye to boring photos and hello to endless possibilities with our diverse photo packs. Whether you need a collection of professional headshots, fun cat photos, or a collection of your favorite travel photos, we have you covered.',
        icon: <Package2Icon className='h-6 w-6' strokeWidth={1.5} />,
    },
    {
        title: 'Customizable Photo Generation',
        description: 'Tailor your photos to your unique style and preferences with our customizable photo generation options. Whether you need a photo of your pet, a portrait of your favorite band, or a photo of your favorite vacation spot, we have you covered.',
        icon: <Palette className='h-6 w-6' strokeWidth={1.5} />,

    },
]

const Features = () => {
    return (
        <section id='features' className='w-full bg-muted py-32 flex flex-col items-center justify-center'>
            <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative bg-muted px-6 xs:px-8 sm:px-0 sm:mx-8 lg:auto'>
                <div className='col-span-full space-y-4'>
                    <AnimatedGradientText className='ml-0 bg-background backdrop-blur-0'>
                        <span
                            className={cn(
                                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            Features
                        </span>
                    </AnimatedGradientText>
                    <h2 className='text-4xl font-bold'>
                        Unlock Unlimited Possibilities with Pictoria AI
                    </h2>
                    <p className='text-base text-muted-foreground lg:max-2-[75%]'>
                        Our platform offers a wide range of features designed to enhance your image creation experience. From easy-to-use editing tools to powerful AI-powered image generation, we have everything you need to bring your ideas to life.
                    </p>
                </div>
                <div className='flex flex-col justify-start items-start order-2 lg:order-1'>
                    {
                        featureList.map((feature, index) => (
                            <div key={index} className='flex items-start gap-4 rounded-lg p-12'>
                                <span className='p-2 rounded-md text-background bg-foreground'>
                                    {feature.icon}
                                </span>
                                <div>
                                    <h3 className='text-2xl font-medium'>
                                        {feature.title}
                                    </h3>

                                    <p className='text-base text-muted-foreground pt-2'>
                                        {feature.description}
                                    </p>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={cn("h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fab] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2")}>
                    <Image src={dashboardImg} alt='features' className='w-full h-auto rounded-tl-lg' />
                </div>
            </div>
        </section>
    )
}

export default Features