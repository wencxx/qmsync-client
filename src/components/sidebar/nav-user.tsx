import {
  ChevronsUpDown,
  LogOut,
  FileUser,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom"
import { UserData } from "@/types/user"
import HeadForm from '@/forms/common-details/head-form'
import FacultyForm from '@/forms/common-details/faculty-form'
import CustodCustodianFormin from '@/forms/common-details/custodian-form'


export function NavUser({
  user,
}: {
  user: UserData | null
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false)
  const [openSheet, setOpenSheet] = useState<boolean>(false)

  const store = useAuthStore()
  const role = useAuthStore((state) => state.role)

  const logout = async () => {
    store.logout()
    navigate('/login')
    window.location.href = "/login";
  }

  const userInitials = user?.firstName?.slice(0, 1) + '' + user?.lastName?.slice(0, 1)

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.firstName} /> */}
                  <AvatarFallback className="rounded-lg">{userInitials || 'QM'}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.firstName} {user?.middleName} {user?.lastName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user?.avatar} alt={user?.firstName} /> */}
                    <AvatarFallback className="rounded-lg">{userInitials || 'QM'}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.firstName} {user?.middleName} {user?.lastName}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenSheet(true)}>
                  <FileUser />
                  Common Details
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenLogoutDialog(true)}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* logout dialog */}
      <AlertDialog open={openLogoutDialog} onOpenChange={setOpenLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* sheet for commond data */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Common Details</SheetTitle>
            <SheetDescription>
              Common details automatically fills in form fields with your saved information, making form completion faster and easier..
            </SheetDescription>
          </SheetHeader>
          <div className="p-5">
            {role === 'Head' ? <HeadForm /> : ( role === 'Faculty' ? <FacultyForm /> : (role === 'Custodians' ? <CustodCustodianFormin /> : '')) }
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
