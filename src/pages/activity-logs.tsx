import { columns } from "@/components/data-table/columns/activity-logs-column"
import { DataTable } from "@/components/data-table/data-table"
import type { ControlForm2 } from "@/types/control-form"
import { useEffect, useState } from "react";
import axios from 'axios'



function ActivityLogs() {
  // get forms
  const [logs, setLogs] = useState<ControlForm2[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const getForms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}logs/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        validateStatus: (status => status < 500)
      })

      if (res.data !== 'No logs found') {
        setLogs(res.data)
        console.log(res.data)
      }else{
        setLogs([])
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
        <h1 className="font-bold text-2xl">Manage Controlled Forms</h1>
      </div>
      <DataTable columns={columns} data={logs} isLoading={loading} />

    </>
  );
}

export default ActivityLogs;