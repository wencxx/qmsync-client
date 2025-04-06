import * as React from "react"
import {
  FileCheck,
  FileText,
  PencilRuler,
  FlaskConical,
  Factory ,
  Map,
  Plug,
  Cpu,
  Wrench,
  Megaphone 
} from "lucide-react"
import { NavDocs } from "@/components/sidebar/nav-documents"
import { NavSingle } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import { useAuthStore } from "@/store/authStore"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  main: [
    {
      name: "Dashboard",
      url: "/",
      icon: Megaphone,
    },
  ],
  documents: [
    {
      title: "Controlled Forms",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Pending",
          url: "/pending-controlled-forms",
        },
        {
          title: "Completed",
          url: "/completed-controlled-forms",
        }
      ],
    },
    {
      title: "Quality Records",
      url: "#",
      icon: FileCheck,
      items: [
        {
          title: "Pending",
          url: "/pending-quality-records",
        },
        {
          title: "Completed",
          url: "/completed-quality-records",
        }
      ],
    }
  ],
  manageDocuments: [
    {
      name: "Controlled Forms",
      url: "/manage-controlled-forms",
      icon: FileText,
    },
    {
      name: "Quality Records",
      url: "/manage-quality-records",
      icon: FileCheck,
    }
  ],
  courses: [
    {
      name: "Department of Architecture",
      url: "/department-of-architectures",
      icon: PencilRuler,
    },
    {
      name: "Department of Industrial Engineering",
      url: "/department-of-industrial-engineering",
      icon: Factory ,
    },
    {
      name: "Department of Chemical and Mining Engineering",
      url: "/department-of-chemical-and-mining-engineering",
      icon: FlaskConical,
    },
    {
      name: "Department of Civil and Geodetic Engineering",
      url: "/department-of-civil-and-geodetic-engineering",
      icon: Map,
    },
    {
      name: "Department of Electrical Engineering",
      url: "/department-of-electrical-engineering",
      icon: Plug,
    },
    {
      name: "Department of Electronics Engineering",
      url: "/department-of-electronics-engineering",
      icon: Cpu,
    },
    {
      name: "Department of Mechanical and Mechatronics",
      url: "/department-of-mechanical-engineering-mechatronics",
      icon: Wrench,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const userData = useAuthStore((state) => state.user)
  const role = userData?.role
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher department={userData?.department} />
      </SidebarHeader>
      <SidebarContent>
        <NavSingle main={data.main} title="main" />
        {role == 'Controller' && <NavDocs items={data.documents} title="documents" />}
        {role == 'Controller' && (
          <>
            <NavSingle main={data.courses} title="storage" />
            <NavSingle main={data.manageDocuments} title="manage documents" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
