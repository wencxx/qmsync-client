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
import { useState } from "react";

function ControlledForm({ formFields, formId, getPendingForms }: { formFields: string[], formId: string, getPendingForms: () => void }) {

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
                userId: 'asdasd'
            }

            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}controlled-forms/submit`, data)
            
            if(res.data === 'success'){
                getPendingForms()
                toast('Submitted controlled form successfully.')
            }else{
                toast('Failed to submit controlled form.')
            }
        } catch (error) {
            console.log(error)
            toast('Failed to submit controlled form.')
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
                            render={({field: formField}) => (
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

export default ControlledForm;