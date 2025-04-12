import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const formSchema = z.object({
    course: z.string().nonempty("Course is required"),
    program: z.string().nonempty("Program is required"),
    semester: z.string().nonempty("Semester is required"),
    academicyear: z.string().nonempty("Academic year is required")
})

function HeadForm() {
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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            course:"",
            program: "",
            semester: "",
            academicyear: "",
        },
    })

    const [loading, setLoading] = useState<boolean>(false)

    const updateDetails = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}common-details/add/${user?._id}`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: status => status < 500
            })

            if (res.status === 200) {
                toast.success("Updated common details successfully")
            } else {
                toast.error("Failed to update common details", {
                    description: "Please try again later"
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("Server error", {
                description: "Please try again later"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateDetails)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Program</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Semester</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st semester">1st semester</SelectItem>
                                            <SelectItem value="2nd semester">2nd semester</SelectItem>
                                            <SelectItem value="3rd semester">3rd semester</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="academicyear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Academic Year</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className={`${loading && 'animate-pulse'} w-full`} disabled={loading}>
                        {!loading ? 'Update' : 'Updating'}
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default HeadForm;