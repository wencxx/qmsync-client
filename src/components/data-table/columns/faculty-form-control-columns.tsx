import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, FileText } from "lucide-react"
import type { FacultyFormsLists } from "@/types/control-form"
import { formatDate } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
import { useParams } from "react-router-dom"

export const columns: ColumnDef<FacultyFormsLists>[] = [
  {
    accessorKey: "formName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Form Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-mediu pl-3">{row.getValue("formName")}</div>,
  },
  {
    accessorKey: "formId",
    header: "Form ID",
    cell: ({ row }) => <div>{row.getValue("formId")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{formatDate(row.getValue("dueDate"))}</div>,
  },
  {
    accessorKey: "completedDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Completed Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const form = row.original

      return (
        <div>{form.submittedForm?.createdAt ? formatDate(form.submittedForm?.createdAt) : 'N/A'}</div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const { facultyId } = useParams()
      const form = row.original
      const dateNow = new Date()
      const dueaDate = new Date(form.dueDate)

      return (
        <Badge variant={facultyId ? (form.filledOut.includes(facultyId) ? 'success' : dateNow > dueaDate ? 'late' : 'pending') : 'default'}>
          {facultyId && (form.filledOut?.includes(facultyId) ? 'Completed' : dateNow > dueaDate ? 'Late' : 'Pending')}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original

      // const generateDocx = async () => {
      //   try {
      //     const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}controlled-forms/generateDocs/${form.submittedFormId}`, {
      //       responseType: "blob",
      //     });

      //     if(response.data === 'Form not found'){
      //       toast('Failed generating form.')
      //       return
      //     }

      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const link = document.createElement("a");
      //     link.href = url;
      //     link.setAttribute("download", `${form.formName}.docx`);
      //     document.body.appendChild(link);
      //     link.click();

      //     window.URL.revokeObjectURL(url);
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(form.formId)}>Copy form ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => generateDocx()}>
              <FileText className="mr-2 h-4 w-4" />
              Export as Docx
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

