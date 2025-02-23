"use client";
import ImagesComponent from "@/components/images/ImagesComponent";
import { Database } from "@/datatypes.types";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect } from "react";


const ImagePage = () => {
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

  console.log(images)

  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-2">My Images</h1>
      <p className="text-muted-foreground mb-6">Here you can see all the images you have generated. Click on an image to view details</p>
      <ImagesComponent images={images ?? []} />
    </section>
  );
};

export default ImagePage;
