import { columns } from "@/components/data-table/columns/quality-record-columns"
import { DataTable } from "@/components/data-table/data-table"
import { useAuthStore } from "@/store/authStore"
import type { CompletedControlledForms } from "@/types/control-form"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

function CompletedQualityRecords() {
  const [forms, setForms] = useState<CompletedControlledForms[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const user = useAuthStore((state) => state.user)

  const getCompletedForms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/completed/${user?._id}`)

      if(res.data !== 'No forms found'){
        setForms(res.data)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch quality records")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?._id) {
      getCompletedForms();
    }
  }, [user]);

  return (
    <>
      <h1 className="font-bold text-2xl">Completed Quality Records  </h1>
      <DataTable columns={columns} data={forms} isLoading={loading} />
    </>
  );
}

export default CompletedQualityRecords;