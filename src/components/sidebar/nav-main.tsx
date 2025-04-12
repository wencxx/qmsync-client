import {
  type LucideIcon,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSingle({
  main,
  title,
  role,
}: {
  main: {
    name: string
    url: string
    icon: LucideIcon,
    requiredRole?: string,
  }[],
  title: string,
  role?: string,
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="capitalize">{title}</SidebarGroupLabel>
      <SidebarMenu>
        {main.map((item) => (
          item.requiredRole && item.requiredRole !== role ? null : (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup >
  )
}
