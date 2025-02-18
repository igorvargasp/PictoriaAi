"use server";

import { ImageFormSchema } from "@/components/image-generation/Configurations";
import { z } from "zod";
import Replicate from "replicate";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/datatypes.types";
import {
    imageMeta
} from "image-meta"
import { randomUUID } from "crypto";



interface ImageResponse {
    error: string | null;
    success: boolean;
    data: Array<string> | null;
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    useFileOutput: false
})


export async function generateImage(input: z.infer<typeof ImageFormSchema>): Promise<ImageResponse> {
    const modeInput = {
        model: input.model,
        go_fast: true,
        megapixels: "1",
        prompt: input.prompt,
        guidance: input.guidance,
        num_outputs: input.num_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps
    }

    try {
        const output = await replicate.run(input.model as `${string}/${string}`, { input: modeInput })
        return {
            error: null,
            success: true,
            data: output as Array<string>
        }
    } catch (error: any) {
        return {
            error: error.message || "Failed to generate image",
            success: false,
            data: null
        }

    }
}

export async function imgUrlToBlob(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob.arrayBuffer();
}

type storeImageInput = {
    url: string;
} & Database["public"]["Tables"]["generated_images"]["Insert"]


export async function storeImages(data: storeImageInput[]) {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "Unauthorized",
            success: false,
            data: null
        }
    }

    const uploadResults = [];
    for (const img of data) {
        const arrayBuffer = await imgUrlToBlob(img.url);
        const { width, height, type } = imageMeta(new Uint8Array(arrayBuffer))
        const fileName = `image_${randomUUID()}.${type}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from('generated_images').upload(filePath, arrayBuffer, {
            contentType: `image/${type}`,
            cacheControl: '3600',
            upsert: false,
        });

        if (uploadError) {
            uploadResults.push({
                fileName,
                error: uploadError.message,
                success: false,
                data: null
            })
            continue;
        }
        const { error: dbError, data: dbData } = await supabase.from('generated_images').insert([{
            user_id: user.id,
            model: img.model,
            prompt: img.prompt,
            aspect_ratio: img.aspect_ratio,
            guidance: img.guidance,
            num_inference_steps: img.num_inference_steps,
            output_format: img.output_format,
            image_name: fileName,
            width,
            height,
        }]).select();

        if (dbError) {
            uploadResults.push({
                fileName,
                error: dbError.message,
                success: !dbError,
                data: dbData || null
            })
        }
    }

    return {
        error: null,
        success: true,
        data: {
            results: uploadResults
        }
    }

}