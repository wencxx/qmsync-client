import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { registerSchema } from '@/schema/registration-schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Departments } from "@/types/departments"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const navigate = useNavigate()

    const [departments, setDepartments] = useState<Departments[]>([])

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}departments/get`)

                if (res.data !== 'No departments found') {
                    setDepartments(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getDepartments()
    }, [])

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            idNumber: "",
            number: "",
            email: "",
            username: "",
            position: "",
            role: "",
            department: "",
            password: "",
            confirmPass: "",
        }
    })

    const [loading, setLoading] = useState<boolean>(false)

    const register = async (values: z.infer<typeof registerSchema>) => {
        const { confirmPass, ...data } = values

        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}auth/register`, data)

            console.log(res.data)
            if (res.data === 'success') {
                toast.success('Registered successfully.', {
                    position: 'top-center'
                })
                navigate('/login')
            } else if (res.data === 'Username must be unique') {
                toast.warning('Username is already in use.', {
                    description: 'Choose a different username',
                    position: 'top-center',
                    descriptionClassName: '!text-neutral-500'
                })
            } else {
                toast.error('Failed to register.', {
                    position: 'top-center'
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to register.', {
                position: 'top-center'
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(register)} className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-5">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Firstname<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middlename</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lastname<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="suffix"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Suffix</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                        <FormLabel>Email<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@slu.edu.ph" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-full grid md:grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="idNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employee/Faculty ID Number<span className="text-main">*</span></FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Department<span className="text-main">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full overflow-hidden">
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {departments.map((department) => (
                                                            <SelectItem key={department._id} value={department._id}>{department.department}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Position<span className="text-main">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Role<span className="text-main">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Faculty">Faculty</SelectItem>
                                                    <SelectItem value="Head">Department Head</SelectItem>
                                                    <SelectItem value="Controller">Document Controller</SelectItem>
                                                    <SelectItem value="Dean">Process Owner - Dean</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-full grid md:grid-cols-2 gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password<span className="text-main">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPass"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password<span className="text-main">*</span></FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className={`col-span-full bg-main ${loading && 'animate-pulse'}`} disabled={loading}>
                                {loading ? 'Registering' : 'Register'}
                            </Button>
                            <div className="mt-4 text-center text-sm col-span-full">
                                Already have an account?{" "}
                                <Link to="/login" className="underline underline-offset-4">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
