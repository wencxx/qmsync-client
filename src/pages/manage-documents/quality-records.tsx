import { columns } from "@/components/data-table/columns/manage-quality-records-columns"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button";
import type { ControlForm2 } from "@/types/control-form"
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
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
import { MultiSelect, Option } from "@/components/ui/multi-select"

const roles: Option[] = [
  { value: "Faculty", label: "Faculty" },
  { value: "Head", label: "Department Head" },
  { value: "Custodians", label: "Lab Custodians" },
]

function ManageQualityRecords() {
  // add form
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof addingControlFormSchema>>({
    resolver: zodResolver(addingControlFormSchema),
    defaultValues: {
      formId: "",
      formName: "",
      dueDate: "",
      file: undefined,
      roles: []
    }
  })

  const onSubmit = async (values: z.infer<typeof addingControlFormSchema>) => {
    const formData = new FormData();
    formData.append("formId", values.formId);
    formData.append("formName", values.formName);
    formData.append("dueDate", values.dueDate);
    formData.append("file", values.file);
    formData.append("roles", JSON.stringify(values.roles));

    try {
      setIsLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_ENDPOINT}quality-records/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data === 'success') {
        getForms()
        setOpenDialog(false)
        toast('Added form successfully.')
      } else {
        toast('Failed to add form')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // get forms
  const [forms, setForms] = useState<ControlForm2[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const getForms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/get`)

      if (res.data !== 'No forms found') {
        setForms(res.data)
      } else {
        setForms([])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getForms()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Manage Quality Records</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus />
          Add Form
        </Button>
      </div>
      <DataTable columns={columns(getForms)} data={forms} isLoading={loading} />

      {/* dialog for adding new form */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Quality Record</DialogTitle>
            <DialogDescription>
              Fill out the details below to add a new quality record.
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
                    <FormLabel>Record ID</FormLabel>
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
                    <FormLabel>Record Name</FormLabel>
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
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Assign to</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={roles}
                        selected={field.value}
                        onChange={(values) => field.onChange(values)}
                        placeholder="Assign to..."
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-full flex justify-end">
                <Button type="submit" className={`${isLoading && 'animate-pulse'}`} disabled={isLoading}>
                  {!isLoading ? 'Submit' : 'Submitting'}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageQualityRecords;