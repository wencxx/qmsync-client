import { columns } from "@/components/data-table/columns/pending-quality-records-column"
import { DataTable } from "@/components/data-table/data-table"
import type { ControlForm2 } from "@/types/control-form"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useAuthStore } from "@/store/authStore"

function PendingQualityRecords() {
  const [pendingForms, setPendingForms] = useState<ControlForm2[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const user = useAuthStore((state) => state.user)

  const getPendingForms = async () => {

    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/pending/${user?._id}`)

      if (res.data !== 'No forms found') {
        setPendingForms(res.data)
      }else{
        setPendingForms([])
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch pending forms")
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if(user?._id){
      getPendingForms()
    }
  }, [user])

  return (
    <>
      <h1 className="font-bold text-2xl">Pending Quality Records</h1>
      <DataTable columns={columns(getPendingForms)} data={pendingForms} isLoading={loading} />
    </>
  );
}

export default PendingQualityRecords;