import React, { useId } from 'react'
import { toast } from 'sonner';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { deleteImages } from '@/actions/image-actions';
import { cn } from '@/lib/utils';

interface DeleteImageProps {
    imageId: string;
    onDelete?: () => void;
    classname?: string;
    imageName: string;
}

const DeleteImage = ({ imageId, onDelete, classname, imageName }: DeleteImageProps) => {
    const toastId = useId();

    const handleDelete = async () => {
        toast.loading("Deleting image...", { id: toastId });

        const { error, success } = await deleteImages(imageId, imageName);

        if (success) {
            toast.success("Image deleted successfully!", { id: toastId });
            onDelete?.();
        } else {
            toast.error(error, { id: toastId });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={cn(classname)} variant={"destructive"}>
                    <Trash2 className='w-4 h-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Image</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this image? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant={"destructive"} className='bg-destructive hover:bg-destructive/90' onClick={handleDelete}>Delete</Button>
                    <Button onClick={onDelete}>Cancel</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteImage