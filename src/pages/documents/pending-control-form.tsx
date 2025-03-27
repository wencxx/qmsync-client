import { columns } from "@/components/data-table/columns/pending-form-controlled-columns"
import { DataTable } from "@/components/data-table/data-table"
import type { ControlForm2 } from "@/types/control-form"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

function PendingControlledForms() {
  const [pendingForms, setPendingForms] = useState<ControlForm2[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getPendingForms = async () => {
    const id = 'asdasd'
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}controlled-forms/pending/${id}`)

      if(res.data !== 'No forms found'){
        setPendingForms(res.data)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch pending forms")
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getPendingForms()
  }, [])

  return (
    <>
      <h1 className="font-bold text-2xl">Pending Controlled Forms</h1>
      <DataTable columns={columns(getPendingForms)} data={pendingForms} isLoading={loading} />
    </>
  );
}

export default PendingControlledForms;