import { FileText, Info } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function HomePage() {
    return (
        <>
            <div className="grid gap-6">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
                    </div>
                </div>
                <Tabs defaultValue="announcements">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="announcements">Announcements</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="announcements" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle>New Privacy Policy Update</CardTitle>
                                    <Badge>Important</Badge>
                                </div>
                                <CardDescription>{format(new Date(2023, 2, 15), "MMMM dd, yyyy")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We've updated our privacy policy to comply with new regulations. Please review the changes and
                                    acknowledge your acceptance by March 31st.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    Read More
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle>System Maintenance</CardTitle>
                                    <Badge variant="outline">Scheduled</Badge>
                                </div>
                                <CardDescription>{format(new Date(2023, 2, 10), "MMMM dd, yyyy")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    The system will be undergoing maintenance this weekend. Expect some downtime between Saturday 10
                                    PM and Sunday 2 AM EST.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    Read More
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle>New Document Submission Process</CardTitle>
                                    <Badge variant="secondary">Process Change</Badge>
                                </div>
                                <CardDescription>{format(new Date(2023, 2, 5), "MMMM dd, yyyy")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We've streamlined the document submission process. Now you can upload multiple files at once and
                                    track their approval status in real-time.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="ml-auto">
                                    Read More
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Notifications</CardTitle>
                                <CardDescription>Stay updated with system changes and new forms</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">New Form Added: Expense Report</h3>
                                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            A new expense report form is now available for submission.
                                        </p>
                                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                                            View Form
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">System Update: Enhanced Search</h3>
                                            <span className="text-xs text-muted-foreground">Yesterday</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            The search functionality has been improved with filters and saved searches.
                                        </p>
                                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                                            Learn More
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">Form Updated: Time Off Request</h3>
                                            <span className="text-xs text-muted-foreground">3 days ago</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            The time off request form has been updated with new fields and validation.
                                        </p>
                                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                                            View Form
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    View All Notifications
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default HomePage;