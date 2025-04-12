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
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useAuthStore } from "@/store/authStore"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const formSchema = z.object({
    department: z.string().nonempty("Department is required"),
    program: z.string().nonempty("Program is required"),
    semesterterm: z.string().nonempty("Semester is required"),
    academicyear: z.string().nonempty("Academic year is required"),
    subject: z.string().nonempty("Subject year is required"),
    days: z.string().nonempty("Days year is required"),
    room: z.string().nonempty("Room year is required"),
    roomnumber: z.string().nonempty("Room Number year is required"),
    group: z.string().nonempty("Group year is required"),
    groupnumber: z.string().nonempty("Group Number year is required"),
    term: z.string().nonempty("Term year is required"),
})

function CustodianForm() {
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
            department: "",
            program: "",
            semesterterm: "",
            academicyear: "",
            subject: "",
            days: "",
            room: "",
            roomnumber: "",
            group: "",
            groupnumber: "",
            term: "",
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
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
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
                        name="semesterterm"
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
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="days"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Days</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="room"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Room</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roomnumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Room Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Group</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="groupnumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Group Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Term</FormLabel>
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

export default CustodianForm;