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
import { ArrowUpDown, MoreHorizontal, FileText, SquarePen } from "lucide-react"
import type { ControlForm2 } from "@/types/control-form"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import ControlledForm from '@/forms/controlled-forms'

export const columns: ColumnDef<ControlForm2>[] = [
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
    accessorKey: "formId",
    header: "Form ID",
    cell: ({ row }) => <div>{row.getValue("formId")}</div>,
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
    accessorKey: "status",
    header: "Status",
    cell: () => {
      return (
        <Badge variant="pending">
          Pending
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original

      const [openDialog, setOpenDialog] = useState<boolean>(false)
      const [formToFill, setFormToFill] = useState<string[]>([])

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(form.formId)}>Copy Form ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setOpenDialog(true), setFormToFill(form.placeholders)}}>
                <SquarePen className="mr-2 h-4 w-4" />
                Fill out
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as Docx
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* form dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="!max-w-xl">
              <DialogHeader>
                <DialogTitle>Fill out form</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <ControlledForm formFields={formToFill}  />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

