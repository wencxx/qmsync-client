import { columns } from "@/components/data-table/columns/form-control-columns"
import { DataTable } from "@/components/data-table/data-table"
import type { ControlForm3 } from "@/types/control-form"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function CompletedControlledForms() {
  const [forms, setForms] = useState<ControlForm3[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getCompletedForms = async () => {
    const idA = 'asdasd'
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}controlled-forms/completed/${idA}`)

      if(res.data !== 'No forms found'){
        setForms(res.data)
        // console.log(res.data)
      }
    } catch (error) {
      console.log(error)
      toast("Failed to fetch completed forms")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCompletedForms()
  }, [])

  return (
    <>
      <h1 className="font-bold text-2xl">Completed Controlled Forms</h1>
      <DataTable columns={columns} data={forms} isLoading={loading} />
    </>
  );
}

export default CompletedControlledForms;