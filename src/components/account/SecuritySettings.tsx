"use client"
import { User } from '@supabase/supabase-js'
import React, { useId } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { resetPassword } from '@/actions/auth-actions'
import { toast } from 'sonner'


interface SecuritySettingsProps {
    user: User
}

const SecuritySettings = ({ user }: SecuritySettingsProps) => {
    const toastId = useId();

    const handleResetPassword = () => {
        if (!user.email) {
            return;
        }
        toast.loading("sending email...", { id: toastId });
        resetPassword({
            email: user.email
        }).then(({ error, success, data }) => {
            if (success) {
                toast.success("Password reset email sent successfully!", { id: toastId });
                console.log(data)
            } else {
                toast.error(error, { id: toastId });
                console.log(error)
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-2'>
                    <h3 className='font-medium'>Password</h3>
                    <p className='text-sm text-muted-foreground'>Change your password to keep your account secure.</p>
                    <Button variant={"outline"} onClick={handleResetPassword}>Change password</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SecuritySettings