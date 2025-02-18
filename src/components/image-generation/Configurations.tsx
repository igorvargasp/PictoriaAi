"use client";
import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Textarea } from '../ui/textarea';
import { generateImage } from '../../actions/image-actions';
import useGeneratedStore from '@/store/useGeneratedStore';


/*
 "prompt": "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
    "go_fast": true,
    "guidance": 3.5,
    "megapixels": "1",
    "num_outputs": 1,
    "aspect_ratio": "1:1",
    "output_format": "webp",
    "output_quality": 80,
    "prompt_strength": 0.8,
    "num_inference_steps": 28

*/

export const ImageFormSchema = z.object({
    model: z.string({
        required_error: "Model is required"
    }),
    prompt: z.string({
        required_error: "Prompt is required"
    }),
    guidance: z.number({
        required_error: "Guidance is required"
    }),
    num_outputs: z.number().min(1, {
        message: "Number of outputs should be at least 1"
    }).max(4, {
        message: "Number of outputs cannot be greater than 4"
    }),
    aspect_ratio: z.string({
        required_error: "Aspect ratio is required"
    }),
    output_format: z.string({
        required_error: "Output format is required"
    }),
    output_quality: z.number().min(1, {
        message: "Output quality should be at least 1"
    }).max(100, {
        message: "Output quality cannot be greater than 4"
    }),
    num_inference_steps: z.number().min(1, {
        message: "Number of inference steps should be at least 1"
    }).max(50, {
        message: "Number of inference steps cannot be greater than 50"
    })

})


const Configurations = () => {
    const generateImage = useGeneratedStore((state) => state.generateImage)
    const { loading } = useGeneratedStore();
    const form = useForm<z.infer<typeof ImageFormSchema>>({
        resolver: zodResolver(ImageFormSchema),
        defaultValues: {
            model: "black-forest-labs/flux-dev",
            prompt: "",
            guidance: 3.5,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "jpg",
            output_quality: 80,
            num_inference_steps: 28,
        }
    });

    const onSubmit = async (form: z.infer<typeof ImageFormSchema>) => {
        await generateImage(form);
    }



    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            let steps;
            if (name === "model") {

                if (value.model === "black-forest-labs/flux-schell") {
                    steps = 4;
                } else {
                    steps = 28;
                }
            }
            if (steps !== undefined) {
                form.setValue("num_inference_steps", steps);
            }
        })

        return () => subscription.unsubscribe();
    }, [form])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className='grid gap-6 p-4 bg-background rounded-lg border'>
                    <legend className='text-sm -ml-1 px-1 font-medium'>
                        Settings
                    </legend>
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="black-forest-labs/flux-dev">Flux Dev</SelectItem>
                                        <SelectItem value="black-forest-labs/flux-schell">Flux Schnell</SelectItem>

                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name="aspect_ratio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aspect Ratio</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an aspect ratio" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1:1">1:1</SelectItem>
                                            <SelectItem value="16:9">16:9</SelectItem>
                                            <SelectItem value="9:16">9:16</SelectItem>
                                            <SelectItem value="21:9">21:9</SelectItem>
                                            <SelectItem value="9:21">9:21</SelectItem>
                                            <SelectItem value="4:5">4:5</SelectItem>
                                            <SelectItem value="5:4">5:4</SelectItem>
                                            <SelectItem value="4:3">4:3</SelectItem>
                                            <SelectItem value="3:4">3:4</SelectItem>
                                            <SelectItem value="2:3">2:3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="num_outputs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of outputs</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={1} max={4}  {...field} onChange={(event) => field.onChange(parseInt(event.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="guidance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div>
                                        Guidance
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} step={0.5} max={10} min={0} onValueChange={(value) => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="num_inference_steps"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div>
                                        Number of inference steps
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} step={1} max={
                                        form.getValues("model") === "black-forest-labs/flux-schell" ? 4 : 50
                                    } min={1} onValueChange={(value) => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="output_quality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <div>
                                        Output quality
                                    </div>
                                    <span>
                                        {field.value}
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} step={1} max={100} min={50} onValueChange={(value) => field.onChange(value[0])} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="output_format"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Output format</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a output format" defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="webp">WebP</SelectItem>
                                        <SelectItem value="png">PNG</SelectItem>
                                        <SelectItem value="jpg">JPG</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prompt</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='font-bold'>{loading ? "Generating..." : "Generate"}</Button>
                </fieldset>
            </form>
        </Form>
    )
}

export default Configurations