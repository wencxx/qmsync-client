import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, FileText, Trash, Eye } from "lucide-react"
import type { ControlForm3 } from "@/types/control-form"
import { formatDate } from "@/lib/utils"
import axios from "axios"

export const columns: ColumnDef<ControlForm3>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    cell: ({ row }) => <div className="font-medium">{row.getValue("formName")}</div>,
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
    cell: ({ row }) => <div>{formatDate(row.getValue("completedDate"))}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => {

      return (
        <Badge variant="success">
          Completed
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original

      const generateDocx = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}controlled-forms/generateDocs/${form.submittedFormId}`, {
            responseType: "blob", // Important: ensures the response is treated as a file
          });

          // Create a URL for the downloaded file
          const url = window.URL.createObjectURL(new Blob([response.data]));
          // Create an <a> element and trigger a download
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "generated-document.docx"); // Set the file name
          document.body.appendChild(link);
          link.click();

          // Cleanup
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.log(error)
        }
      }

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
            <DropdownMenuItem onClick={() => generateDocx()}>
              <FileText className="mr-2 h-4 w-4" />
              Export as Docx
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

