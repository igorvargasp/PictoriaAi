"use client";
import React, { useId } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { changePassword, login } from "../../actions/auth-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
});

const ChangePasswordForm = ({ className }: { className?: string }) => {
    const toastId = useId();
    const [loading, setLoading] = React.useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        toast.loading(" Changing password...", { id: toastId });
        setLoading(true);



        const { success, error } = await changePassword(values.password);

        if (success) {
            toast.success(" Password changed successfully!", {
                id: toastId,
            });
            setLoading(false);
            redirect("/login");
        } else {
            toast.error(error, { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className={cn("grid gap-6", className)}>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Change Password</h1>
                <p className="text-sm text-muted-foreground"> Enter your new password to change it.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="...." {...field} />
                                </FormControl>
                                <FormDescription>Your password must be at least 8 characters.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your again"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Re-enter your password to confirm.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        {loading ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            "Change Password"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;
