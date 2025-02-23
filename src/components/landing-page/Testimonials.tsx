import React from 'react'
import { AnimatedGradientText } from '../ui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { Marquee } from '../magicui/marquee';
import avatar1 from "@/public/avatars/AutumnTechFocus.jpeg"
import avatar2 from "@/public/avatars/Casual Creative Professional.jpeg"
import avatar3 from "@/public/avatars/Golden Hour Contemplation.jpeg"
import avatar4 from "@/public/avatars/Portrait of a Woman in Rust-Colored Top.jpeg"
import avatar5 from "@/public/avatars/Radiant Comfort.jpeg"
import avatar6 from "@/public/avatars/Relaxed Bearded Man with Tattoo at Cozy Cafe.jpeg"
import Image, { StaticImageData } from 'next/image';


const reviews = [
    {
        name: "Jack Smith",
        username: "@jacksmith",
        body: "The dating profile photos I received transformed my online presence and boosted my matches significantly. Truly a game changer!",
        img: avatar1,
    },
    {
        name: "Jill Smith",
        username: "@jillsmith",
        body: "I was completely blown away by the results. This service exceeded all my expectations. Absolutely amazing!",
        img: avatar2,
    },
    {
        name: "John Doe",
        username: "@johndoe",
        body: "Using Photo AI for my LinkedIn profile was a fantastic decision. The quality was outstanding, and I got multiple job offers!",
        img: avatar3,
    },
    {
        name: "Jane Doe",
        username: "@janedoe",
        body: "Words can't express how thrilled I am with the results. This service is simply phenomenal. I love it!",
        img: avatar4,
    },
    {
        name: "Jenny Mandell",
        username: "@jennymandell",
        body: "I can't find the words to describe how impressed I am. This service is truly remarkable. I love it!",
        img: avatar5,
    },
    {
        name: "James Cameron",
        username: "@jamescameron",
        body: "I am genuinely amazed by the quality of the photos. This service is a game changer for anyone looking to enhance their profile!",
        img: avatar6,
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);


const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string | StaticImageData;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
                // light styles
                "border-primary/[.15] bg-muted/70 hover:bg-muted/80",
                // dark styles

            )}
        >
            <blockquote className="mt-2 text-sm">{body}</blockquote>
            <div className="flex flex-row items-center gap-2 mt-2">
                <Image className="rounded-full aspect-square" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>

        </figure>
    );
};


const Testimonials = () => {
    return (
        <section id='testimonials' className='w-full py-32 flex flex-col items-center justify-center'>
            <AnimatedGradientText className='bg-background backdrop-blur-0'>
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    Testimonials
                </span>
            </AnimatedGradientText>
            <h2 className='text-2xl xs:text-3xl sm:text-4xl font-bold mt-4'>
                What Our Users Say
            </h2>
            <p className='text-sm xs:text-base text-muted-foreground mt-4 text-center '>
                Discover why thousands are choosing Pictoria AI for effortless, high-quality photo generation, from LinkedIn headshots to vibrant social media content.
            </p>

            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-16">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem] sm:[--gap:2rem] mt-1">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>

        </section>
    )
}

export default Testimonials