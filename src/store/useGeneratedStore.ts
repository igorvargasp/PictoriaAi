import { create } from 'zustand'
import { z } from 'zod'
import { ImageFormSchema } from '@/components/image-generation/Configurations';
import { generateImage as generateImageAction, storeImages } from '@/actions/image-actions';
import { toast } from 'sonner';

interface GenerateState {
    loading: boolean;
    images: Array<{ url: string }> | null;
    error: string | null;
    generateImage: (input: z.infer<typeof ImageFormSchema>) => Promise<void>;
}

const useGeneratedStore = create<GenerateState>((set) => ({
    loading: false,
    images: [],
    error: null,
    generateImage: async (input: z.infer<typeof ImageFormSchema>) => {
        set({ loading: true, error: null })
        const toastId = toast.loading("Generating image...");
        try {
            const { data, error, success } = await generateImageAction(input);
            if (!success) {
                set({ loading: false, error: error })
                return
            }
            const dataWithUrl = data?.map((image) => ({ url: image, ...input }))
            set({ loading: false, images: dataWithUrl as Array<{ url: string }> })
            toast.success("Image generated successfully!", { id: toastId });
            await storeImages(dataWithUrl ?? [])
            toast.success("Image stored successfully!", { id: toastId });
        } catch (error) {
            console.log(error)
            set({ loading: false, error: "Failed to generate image" })
        }
    }
}))

export default useGeneratedStore