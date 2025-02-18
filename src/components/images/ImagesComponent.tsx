import { Tables } from '@/datatypes.types';
import React from 'react'

type Image = {
    url: string | undefined;
} & Tables<"generated_images">

interface ImagesComponentProps {
    images: Image[];
}

const ImagesComponent = ({ images }: ImagesComponentProps) => {
    return (
        <div>ImagesComponent</div>
    )
}

export default ImagesComponent