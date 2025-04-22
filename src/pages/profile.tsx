import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/authStore"
// import { UserData } from '@/types/user'

export default function ProfilePage() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <Avatar className="h-48 w-48 mb-4">
                                <AvatarImage src="/placeholder.svg?height=192&width=192" alt="Profile picture" />
                                <AvatarFallback>{[user?.firstName?.slice(0, 1), user?.lastName?.slice(0, 1)].filter(Boolean).join('')}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-semibold">{[user?.firstName, user?.middleName, user?.lastName, user?.suffix].filter(Boolean).join(' ')}</h2>
                            <p className="text-muted-foreground">{user?.position}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                                <p>{[user?.firstName, user?.middleName, user?.lastName, user?.suffix].filter(Boolean).join(' ')}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                                <p>{user?.email}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                                <p>{user?.number}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Faculty ID Number</h3>
                                <p>{user?.idNumber}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                                <p>{user?.department?.department}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                                <p>{user?.username}</p>
                            </div>
                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Position & Role</h3>
                                <p>
                                    {[user?.position, user?.role].filter(Boolean).join(', ')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
