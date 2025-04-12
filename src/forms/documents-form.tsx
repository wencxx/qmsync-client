import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

function DocumentsForm({ formFields, formId, setOpenDialog, getPendingForms, endpoint }: { formFields: string[], formId: string, setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, getPendingForms: () => void, endpoint: string }) {

    const user = useAuthStore((state) => state.user)

    const getDetails = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}common-details/get/${user?._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: status => status < 500
            })

            if (res.status === 200) {
                form.reset(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user?._id) {
            getDetails()
        }
    }, [user?._id])

    const form = useForm<{ [key: string]: string }>({
        defaultValues: formFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
    });

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = async (values: any, e: any) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const data = {
                ...values,
                formId: formId,
                userId: user?._id,
            }

            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}${endpoint}/submit`, data)

            if (res.data === 'success') {
                getPendingForms()
                setOpenDialog(false)
                toast.success('Submitted controlled form successfully.')
            } else {
                toast.error('Failed to submit controlled form.')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to submit controlled form.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-3">
                    {formFields.map((field) => (
                        <FormField
                            control={form.control}
                            name={field}
                            key={field}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">{field}</FormLabel>
                                    <FormControl>
                                        <Input {...formField} value={formField.value || ""} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <div className="col-span-full flex justify-end">
                        <Button className={`${isLoading && 'animate-pulse'}`} disabled={isLoading}>
                            {isLoading ? 'Submitting Form' : 'Submit Form'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default DocumentsForm;