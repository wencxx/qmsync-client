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

function ControlledForm({ formFields }: { formFields: string[] }) {

    const form = useForm()

    const onSubmit = () => {

    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-3">
                    {formFields.map((field) => (
                        <FormField
                            control={form.control}
                            name={field}
                            render={() => (
                                <FormItem>
                                    <FormLabel className="capitalize">{field}</FormLabel>
                                    <FormControl>
                                        <Input />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </form>
            </Form>
        </>
    );
}

export default ControlledForm;