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
import { useEffect, useState } from "react";

function EditDocumentsForm({ formFields, setOpenDialog, data, endpoint }: { formFields: string[], setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>, data: {[key: string]: string }, endpoint: string }) {



    const form = useForm<{ [key: string]: string }>({
        defaultValues: formFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
    });

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        form.reset(data)
    }, [])

    const onSubmit = async (values: any, e: any) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const data = {
                ...values,
            }

            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}${endpoint}/update/${data.id}`, data)

            if (res.status === 200) {
                setOpenDialog(false)
                toast.success('Updated controlled form successfully.')
            } else {
                toast.error('Failed to update controlled form.')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to update controlled form.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-3">
                    {formFields.map((field, index) => (
                        <FormField
                            control={form.control}
                            name={field}
                            key={index}
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

export default EditDocumentsForm;