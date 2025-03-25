import { columns } from "@/components/data-table/columns/form-control-columns"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button";
import type { ControlForm } from "@/types/control-form"
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addingControlFormSchema } from '@/schema/controlled-form'
import axios from 'axios'
import { toast } from "sonner";


const mockForms: ControlForm[] = [
  {
    id: 1,
    formId: "CF-2023-001",
    formName: "Safety Inspection Report",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-15T10:30:00Z",
    status: "Completed",
    department: "Operations",
    version: "1.2",
  },
  {
    id: 2,
    formId: "CF-2023-002",
    formName: "Equipment Maintenance Checklist",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-18T14:45:00Z",
    status: "Completed",
    department: "Maintenance",
    version: "2.0",
  },
  {
    id: 3,
    formId: "CF-2023-003",
    formName: "Incident Report Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-20T09:15:00Z",
    status: "Completed",
    department: "Safety",
    version: "1.0",
  },
  {
    id: 4,
    formId: "CF-2023-004",
    formName: "Quality Control Inspection",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-22T11:00:00Z",
    status: "Completed",
    department: "Quality Assurance",
    version: "3.1",
  },
  {
    id: 5,
    formId: "CF-2023-005",
    formName: "Employee Training Record",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-25T13:30:00Z",
    status: "Completed",
    department: "HR",
    version: "1.5",
  },
  {
    id: 6,
    formId: "CF-2023-006",
    formName: "Risk Assessment Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-28T15:20:00Z",
    status: "Completed",
    department: "Safety",
    version: "2.2",
  },
  {
    id: 7,
    formId: "CF-2023-007",
    formName: "Environmental Compliance Checklist",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-03-30T10:45:00Z",
    status: "Completed",
    department: "Environmental",
    version: "1.3",
  },
  {
    id: 8,
    formId: "CF-2023-008",
    formName: "IT Security Audit Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-02T09:00:00Z",
    status: "Completed",
    department: "IT",
    version: "2.1",
  },
  {
    id: 9,
    formId: "CF-2023-009",
    formName: "Customer Complaint Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-05T14:15:00Z",
    status: "Completed",
    department: "Customer Service",
    version: "1.0",
  },
  {
    id: 10,
    formId: "CF-2023-010",
    formName: "Supplier Evaluation Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-08T11:30:00Z",
    status: "Completed",
    department: "Procurement",
    version: "2.4",
  },
  {
    id: 11,
    formId: "CF-2023-011",
    formName: "Project Closure Report",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-10T16:00:00Z",
    status: "Completed",
    department: "Project Management",
    version: "1.1",
  },
  {
    id: 12,
    formId: "CF-2023-012",
    formName: "Vehicle Inspection Form",
    dueDate: "2023-03-18T14:45:00Z",
    completedDate: "2023-04-12T08:45:00Z",
    status: "Completed",
    department: "Fleet Management",
    version: "3.0",
  },
]

function ManageControlledForms() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof addingControlFormSchema>>({
    resolver: zodResolver(addingControlFormSchema),
    defaultValues: {
      formId: "",
      formName: "",
      dueDate: "",
      file: undefined
    }
  })

  const onSubmit = async (values: z.infer<typeof addingControlFormSchema>) => {
    const formData = new FormData();
    formData.append("formId", values.formId);
    formData.append("formName", values.formName);
    formData.append("dueDate", values.dueDate);
    formData.append("file", values.file);

    try {
      setIsLoading(true)
      const res = await axios.post('http://localhost:3000/api/controlled-forms', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if(res.data === 'success'){
        setOpenDialog(false)
        toast('Added form successfully')
      }else{
        toast('Failed to add form')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Manage Controlled Forms</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus />
          Add Form
        </Button>
      </div>
      <DataTable columns={columns} data={mockForms} />

      {/* dialog for adding new form */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Controlled Form</DialogTitle>
            <DialogDescription>
              Fill out the details below to add a new controlled form.
            </DialogDescription>
          </DialogHeader>
          {/* Add form fields here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3 grid sm:grid-cols-2">
              <FormField
                control={form.control}
                name="formId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="formName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="datetime-local" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, ref } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={ref}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full flex justify-end">
                <Button type="submit" className={`${isLoading && 'animate-pulse'}`} disabled={isLoading}>
                  {!isLoading ? 'Submit' : 'Submitting' }</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageControlledForms;