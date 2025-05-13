import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowUpDown, Pencil } from "lucide-react"
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
import DocumentsForm from '@/forms/documents-form'

export const columns = (getPendingForms: () => void): ColumnDef<ControlForm2>[] => [
  {
    accessorKey: "formId",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Form ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-3">{row.getValue("formId")}</div>,
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
    cell: ({ row }) => {
      const { dueDate } = row.original

      const currentDate = new Date()
      const due = new Date(dueDate)

      const isLate = currentDate > due

      return (
        <Badge variant={isLate ? 'late' : 'pending'} className="w-full xl:w-1/3">
          {isLate ? 'Late' : 'Pending'}
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
      const [formId, setFormId] = useState<string>('')

      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pencil size={17} onClick={() => { setOpenDialog(true), setFormToFill(form.placeholders), setFormId(form._id) }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Fill out form</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>


          {/* form dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="md:!max-w-3xl">
              <DialogHeader>
                <DialogTitle>Fill out form</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DocumentsForm formFields={formToFill} formId={formId} setOpenDialog={setOpenDialog} getPendingForms={getPendingForms} endpoint="controlled-forms" />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

