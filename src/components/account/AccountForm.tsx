"use client"
import { User } from '@supabase/supabase-js'
import React, { useId } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import { updateProfile } from '@/actions/auth-actions'

interface AccountFormProps {
    user: User
}

const formSchema = z.object({
    full_name: z.string().min(1).max(100),
    email: z.string().email().min(1).max(100),
})

const AccountForm = ({ user }: AccountFormProps) => {
    const toastId = useId();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: user.user_metadata.full_name ?? "",
            email: user.email ?? "",
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        toast.loading("Updating profile...", { id: toastId });
        updateProfile({
            fullName: data.full_name,
            email: data.email
        }).then(({ error, success, data }) => {
            if (success) {
                toast.success("Profile updated successfully!", { id: toastId });
            } else {
                toast.error(error, { id: toastId });
            }
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" disabled {...field} />
                                    </FormControl>
                                    <FormDescription>Your email address is private and will not be shared.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">

                            Update Profile

                        </Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

export default AccountForm