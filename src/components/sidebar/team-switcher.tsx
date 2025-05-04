import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Departments } from "@/types/departments"
import logo from '@/assets/logo.png'

export function TeamSwitcher({ department }: {
  department: Departments | undefined
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-main text-sidebar-primary-foreground">
            <img src={logo} alt="website logo" className="w-4/5 aspect-square" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              QMSync HAHAHAHAH
            </span>
            <span className="truncate text-xs">{department?.department}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
