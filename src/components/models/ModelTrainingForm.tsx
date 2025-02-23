"use client";
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const ACCEPTED_FILE_TYPES = ["application/zip", "application/x-zip-compressed"];
const MAX_FILE_SIZE = 45 * 1024 * 1024;

const formSchema = z.object({
    model_name: z.string({
        required_error: "Model name is required"
    }),
    trigger_word: z.string({
        required_error: "Trigger word is required"
    }),
    gender: z.enum(["man", "women"]),
    zipFile: z.any().refine((files) => files?.[0] instanceof File, "Please select a file").refine(files => files?.[0].type && ACCEPTED_FILE_TYPES.includes(files?.[0].type), "Please select a valid file").refine(files => files?.[0].size < MAX_FILE_SIZE, "File size should be less than 45MB"),
})

const ModelTrainingForm = () => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model_name: "",
            trigger_word: undefined,
            gender: "man",
            zipFile: undefined
        }
    });
    const fileRef = form.register("zipFile");

    const onSubmit = async (form: z.infer<typeof formSchema>) => {
        console.log(form)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <fieldset className='grid max-w-5xl bg-background p-8 rounded-lg gap-6 border'>
                    <FormField
                        control={form.control}
                        name="model_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter your model name" {...field} />
                                </FormControl>
                                <FormDescription>This will be the name of your model.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Please select the gender of the images</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="man" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Male
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="woman" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Female
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipFile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Training Data (Zip File) | <span className='text-destructive'>Read the requirements below</span> </FormLabel>
                                <div className='mb-4 rounded-lg pb-4 text-card-foreground shadow-sm'>
                                    <ul className='space-y-2 text-sm text-muted-foreground'>
                                        <li> • Provide 10, 12 or 15 images in total</li>
                                        <li> • Ideal breakdown for 12 images:</li>
                                        <ul className='ml-4 mt-1 space-y-1'>
                                            <li> 6 face closeups</li>
                                            <li> 3/4 half body closeups (till stomach)</li>
                                            <li> 2/3 full body shots</li>
                                        </ul>
                                        <li> • No accessories on face/head ideally</li>
                                        <li> • No other people in images</li>
                                        <li> • Different expressions, clothing, backgrounds with good lighting</li>
                                        <li> • Images to be in 1:1 resolution (1048x1048 or higher)</li>
                                        <li> • Use images of similar age group (ideally within past few months)</li>
                                        <li> • Provide only zip file (under 45MB size)</li>
                                    </ul>
                                </div>
                                <FormControl>
                                    <Input type="file" accept='.zip'  {...fileRef} onChange={(event) => field.onChange(event.target.files)} />
                                </FormControl>
                                <FormDescription>Upload a zip file containing your training images max 45mb.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-fit'>Submit</Button>
                </fieldset>
            </form>
        </Form>
    )
}

export default ModelTrainingForm