import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/sidebar/nav-user"
import { useAuthStore } from "@/store/authStore";

function Layout() {
    const userData = useAuthStore((state) => state.user)

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center justify-between gap-2 px-4 w-full">
                            <SidebarTrigger />
                            <div>
                                <NavUser user={userData} />
                            </div>
                            {/* <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Building Your Application
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb> */}
                        </div>
                    </header>
                    <main className="px-5 lg:px-10 py-5 space-y-10">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}

export default Layout;