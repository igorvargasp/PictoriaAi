"use client"
import { Database, Tables } from '@/datatypes.types';
import { createClient } from '@/lib/supabase/client';
import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageIcon, Layers, LayersIcon, Wallet, ZapIcon } from 'lucide-react';

const StatsCard = ({ credits }: { credits: Tables<'credits'> | null }) => {
    const [images, setImages] = React.useState<any>([]);

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

    const imageCount = images?.length || 0
    return (
        <div className='grid grid-cols-4 gap-6'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Images</CardTitle>
                    <ImageIcon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        {imageCount}
                    </div>
                    <p className='text-xs text-muted-foreground'>Images generated so far</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Models</CardTitle>
                    <LayersIcon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        1
                    </div>
                    <p className='text-xs text-muted-foreground'>Models trained so far</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Image credits</CardTitle>
                    <ZapIcon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        {credits?.image_generation_count || 0}/{credits?.max_image_generation_count || 0}
                    </div>
                    <p className='text-xs text-muted-foreground'>Available credits</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Model credits</CardTitle>
                    <Wallet className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                    <div className='text-2xl font-bold'>
                        {credits?.model_training_count || 0}/{credits?.max_model_training_count || 0}
                    </div>
                    <p className='text-xs text-muted-foreground'>Available credits</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCard