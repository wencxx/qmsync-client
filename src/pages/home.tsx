import { FileText, Plus } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from 'sonner'
import moment from "moment"
import { Link } from 'react-router-dom'

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
})

interface News {
    _id?: string,
    title: string,
    description: string,
    createdAt: Date,
    __v?: number

}

interface Notifications {
    _id: string,
    title: string,
    content: string,
    for: string[],
    read: string[],
    formType: string,
    createdAt: Date,
    __v: number

}

function HomePage() {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const store = useAuthStore()
    const user = useAuthStore((state) => state.user)

    // get notifications
    const [notifications, setNotificaitons] = useState<Notifications[]>([])

    const getNotifications = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}news/getNotif/${user?.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: (status => status < 500)
            })

            if (res.status === 200) {
                setNotificaitons(res.data)
            } else {
                setNotificaitons([])
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.", {
                description: "Please try again later."
            })
        }
    }

    useEffect(() => {
        if (user?.role) {
            getNotifications()
        }
    }, [user?.role])

    // get news
    const [news, setNews] = useState<News[]>([])
    const [loadingData, setLoadingData] = useState<boolean>(true)

    const getNews = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}news/get`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: (status => status < 500)
            })

            if (res.status === 200) {
                setNews(res.data)
            } else {
                setNews([])
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.", {
                description: "Please try again later."
            })
        } finally {
            setLoadingData(false)
        }
    }

    useEffect(() => {
        getNews()
    }, [])


    // add news
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const [loading, setLoading] = useState(false)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}news/add`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                validateStatus: (status => status < 500)
            })

            if (res.status === 200) {
                setOpenDialog(false)
                getNews()
                toast.success("Announcement added successfully")
            } else {
                toast.error("Failed to add announcement")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    // delete news
    const [newsToDelete, setNewsToDelete] = useState<string>('')
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const deleteNews = (newsId?: string) => {
        if (newsId) {
            setNewsToDelete(newsId)
            setOpenDeleteDialog(true)
        }
    }

    const confirmDelete = async () => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_ENDPOINT}news/delete/${newsToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                validateStatus: (status => status < 500)
            })

            if (res.status === 200) {
                getNews()
                toast.success('News deleted successfully')
                setOpenDeleteDialog(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete news", {
                description: "Please refresh and try again"
            })
        }
    }

    // check if theres new notifications
    const hasUnreadNotif = () => {
        const userId = user?._id;
        if (!userId) return false;
        return notifications.some((notif) => !notif.read.includes(userId));
    };

    // function to read all notifications
    const readNotifications = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_ENDPOINT}news/read-all/${user?._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            getNotifications()
        } catch (error) {
            console.log(error)            
        }
    }

    return (
        <>
            <div className="grid gap-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
                    </div>
                    {store.hasRole('Controller') && (
                        <Button onClick={() => setOpenDialog(true)}>
                            <Plus />
                            Add news
                        </Button>
                    )}
                </div>
                <Tabs defaultValue="announcements">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="announcements">Announcements</TabsTrigger>
                        <TabsTrigger className="relative" value="notifications" onClick={() => readNotifications()}>
                            Notifications
                            {hasUnreadNotif() && <span className="absolute -top-2 right-0 w-3 aspect-square bg-red-500 rounded-full"></span>}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="announcements" className="mt-4 space-y-4">
                        {!loadingData ? (
                            news.length ? (
                                news.map((n) => (
                                    <Card key={n._id}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>{n.title}</CardTitle>
                                                {store.hasRole('Controller') && n._id && (
                                                    <Badge className="cursor-pointer" onClick={() => deleteNews(n._id)}>Delete</Badge>
                                                )}
                                            </div>
                                            <CardDescription>{format(new Date(n.createdAt), "MMMM dd, yyyy")}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>
                                                {n.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline" size="sm" className="ml-auto">
                                                Read More
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-center">No announcement to show.</p>
                            )
                        ) : (
                            'Loading data...'
                        )}
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Notifications</CardTitle>
                                <CardDescription>Stay updated with system changes and new forms</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notifications.length ? (
                                    notifications.map((notification) => (
                                        <div className="flex items-start gap-4 rounded-lg border p-4" key={notification._id}>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium capitalize">{notification.title}</h3>
                                                    <span className="text-xs text-muted-foreground">{moment(notification.createdAt).fromNow()}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {notification.content}
                                                </p>
                                                <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                                                    {notification.formType === 'form' ? (
                                                        <Link to='/pending-controlled-forms'>View form</Link>
                                                    ) : (
                                                        <Link to='/pending-quality-records'>View form</Link>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">No notifications to show.</p>
                                )}
                            </CardContent>
                            {/* <CardFooter>
                                <Button variant="outline" className="w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter> */}
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* dialog for adding announcement */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Announcement</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className={`float-end ${loading && 'animate-pulse'}`} disabled={loading}>
                                    {loading ? "Adding..." : "Add"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>

            {/* alert dialog for delete */}
            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Do you want to proceed?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the news
                            and remove the data from the server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => confirmDelete()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default HomePage;