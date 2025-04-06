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
import type { CompletedControlledForms } from "@/types/control-form"
import { formatDate } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
import ConvertApi from 'convertapi-js';

export const columns: ColumnDef<CompletedControlledForms>[] = [
  {
    accessorKey: "formId",
    header: "Record ID",
    cell: ({ row }) => <div>{row.getValue("formId")}</div>,
  },
  {
    accessorKey: "formName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Record Name
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
          const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/generateDocs/${form.submittedFormId}`, {
            responseType: "blob",
          });

          if(response.data === 'Record not found'){
            toast('Failed generating form.')
            return
          }

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${form.formName}-quality-record.docx`);
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
          const response = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/generateDocs/${form.submittedFormId}`, {
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
      )
    },
  },
]

