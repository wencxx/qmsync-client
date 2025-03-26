import * as React from "react"
import {
  BookOpen,
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Wency Baterna",
    email: "wncbtrn@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      name: "Dashboard",
      url: "#",
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
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
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
      url: "#",
      icon: FileCheck,
    }
  ],
  courses: [
    {
      name: "Department of Architecture",
      url: "/deparment-of-architectures",
      icon: PencilRuler,
    },
    {
      name: "Department of Industrial Engineering",
      url: "#",
      icon: Factory ,
    },
    {
      name: "Department of Chemical and Mining Engineering",
      url: "#",
      icon: FlaskConical,
    },
    {
      name: "Department of Civil and Geodetic Engineering",
      url: "#",
      icon: Map,
    },
    {
      name: "Department of Electrical Engineering",
      url: "#",
      icon: Plug,
    },
    {
      name: "Department of Electronics Engineering",
      url: "#",
      icon: Cpu,
    },
    {
      name: "Department of Mechanical and Mechatronics",
      url: "#",
      icon: Wrench,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavSingle main={data.main} title="main" />
        <NavDocs items={data.documents} title="documents" />
        <NavSingle main={data.courses} title="storage" />
        <NavSingle main={data.manageDocuments} title="manage documents" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
