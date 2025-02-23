import { Tables } from '@/datatypes.types';
import Image from 'next/image';
import React from 'react'
import ImageDialog from './ImageDialog';

type Image = {
    url: string | undefined;
} & Tables<"generated_images">

interface ImagesComponentProps {
    images: Image[];
}

const ImagesComponent = ({ images }: ImagesComponentProps) => {
    const [selectedImage, setSelectedImage] = React.useState<Image | null>(null);

    if (images.length === 0) {
        return (
            <div className='flex items-center justify-center h-[50vh] text-muted-foreground'>No images found</div>
        )
    }

    return (
        <section className='container mx-auto py-8'>
            <div className='columns-4 gap-4 space-y-4'>
                {
                    images.map((image, index) => ((
                        <div key={index} onClick={() => setSelectedImage(image)}>
                            <div className='relative overflow-hidden cursor-pointer transition-transform group'>
                                <div className='absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 rounded'>
                                    <div className='flex items-center justify-center h-full'>
                                        <p className='text-primary-foreground text-lg font-semibold'>View Details</p>
                                    </div>
                                </div>
                                <Image src={image.url!} alt={image.prompt!} width={image.width!} height={image.height!} className="object-cover rounded" />
                            </div>
                        </div>
                    )))
                }
            </div>
            {
                selectedImage && (
                    <ImageDialog image={selectedImage} onClose={() => setSelectedImage(null)} />
                )
            }
        </section>
    )
}

export default ImagesComponent