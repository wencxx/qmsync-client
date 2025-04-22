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
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

interface credentials {
    username: string
    password: string
}

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const store = useAuthStore()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<credentials>({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const login = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}auth/login`, credentials)

            if (res.data?.message === 'Login') {
                const userData = res.data?.userData

                localStorage.setItem('role', userData.role);
                localStorage.setItem('token', userData.token);

                store.login(userData)

                navigate('/')
            } else if (res.data === 'Invalid credentials') {
                toast.error('Invalid Credentials', {
                    description: 'Make sure to enter correct credentials',
                    position: 'top-center',
                    descriptionClassName: '!text-neutral-500'
                })
            } else if (res.data === 'Password do not match') {
                toast.error('Password do not match', {
                    position: 'top-center',
                    descriptionClassName: '!text-neutral-500'
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={login}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    onChange={() => handleChange(event)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <div className="relative">
                                    <Input type={showPassword ? "text" : "password"} name="password" className={cn("pr-10", className)} onChange={() => handleChange(event)} required  />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                            </div>
                            <Button type="submit" className={`w-full ${loading && 'animate-pulse'}`} disabled={loading}>
                                {loading ? 'Logging in' : 'Login'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
