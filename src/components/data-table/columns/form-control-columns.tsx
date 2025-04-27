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
import { ArrowUpDown, MoreHorizontal, FileText, Pencil } from "lucide-react"
import type { CompletedControlledForms } from "@/types/control-form"
import { formatDate } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
import ConvertApi from 'convertapi-js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import EditDocumentsForm from '@/forms/edit-documents-form'

export const columns: ColumnDef<CompletedControlledForms>[] = [
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
    cell: ({ row }) => <div className="font-mediu pl-3">{row.getValue("formName")}</div>,
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
            responseType: "blob",
          });

          if (response.data === 'Form not found') {
            toast('Failed generating form.')
            return
          }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${form.formName}-form-controlled.docx`);
          document.body.appendChild(link);
          link.click();

          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.log(error)
        }
      }

      const generatePDF = async () => {
        const toastId = toast.loading('Generating pdf...', {
          position: 'top-right'
        });
        try {
          const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}controlled-forms/generateDocs/${form.submittedFormId}`, {
            responseType: 'blob',
          });

          if (response.status !== 200) {
            toast('Failed generating form.');
            return;
          }

          let convertApi = ConvertApi.auth('secret_DMPqpeqfWbt4HgPC');

          let params = convertApi.createParams();
          const fileBlob = new Blob([response.data], { type: 'application/msword' });
          const file = new File([fileBlob], 'document.docx', { type: 'application/msword' });

          params.add('File', file);

          const result = await convertApi.convert('docx', 'pdf', params);

          if (!result) {
            toast('Failed converting to PDF.');
            return;
          }

          const pdfUrl = result.files[0].Url;

          const link = document.createElement('a');
          link.href = pdfUrl;
          link.setAttribute('download', `${form.formName}-quality-record.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

        } catch (error) {
          console.error(error);
          toast('Error generating PDF.');
        } finally {
          toast.dismiss(toastId)
        }
      };

      const viewPDF = async () => {
        const toastId = toast.loading('Preparing PDF...', {
          position: 'top-right',
        });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_ENDPOINT}controlled-forms/generateDocs/${form.submittedFormId}`,
            {
              responseType: 'blob',
            }
          );

          if (response.status !== 200) {
            toast('Failed generating form.');
            return;
          }

          let convertApi = ConvertApi.auth('secret_DMPqpeqfWbt4HgPC');

          let params = convertApi.createParams();
          const fileBlob = new Blob([response.data], { type: 'application/msword' });
          const file = new File([fileBlob], 'document.docx', { type: 'application/msword' });

          params.add('File', file);

          const result = await convertApi.convert('docx', 'pdf', params);

          if (!result) {
            toast('Failed converting to PDF.');
            return;
          }

          const pdfBlob = await fetch(result.files[0].Url).then((res) => res.blob());
          const pdfUrl = URL.createObjectURL(pdfBlob);

          // Open the PDF in a new browser tab
          window.open(pdfUrl, '_blank');
        } catch (error) {
          console.error(error);
          toast('Error preparing PDF.');
        } finally {
          toast.dismiss(toastId);
        }
      };

      const [openEditForm, setOpenEditForm] = useState(false)
      const [dataToEdit, setDataToEdit] = useState({})
      const [placeholdersToEdit, setPlaceholders] = useState<string[]>([])

      const editForm = (data: string[], placeholders: string[]) => {
        setOpenEditForm(true)
        setDataToEdit(data)
        setPlaceholders(placeholders)
      }

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(form.formId)}>Copy form ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => viewPDF()}>
                <FileText className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editForm(row.original.answers, row.original.placeholders)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => generatePDF()}>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateDocx()}>
                <FileText className="mr-2 h-4 w-4" />
                Export as Docx
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
            <DialogContent className="!max-w-xl">
              <DialogHeader>
                <DialogTitle>Fill out form</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <EditDocumentsForm formFields={placeholdersToEdit} setOpenDialog={setOpenEditForm} data={dataToEdit} endpoint="controlled-forms" />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

