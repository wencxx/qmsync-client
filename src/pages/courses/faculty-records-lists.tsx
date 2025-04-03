import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { FacultyFormsLists } from "@/types/control-form";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns/faculty-form-control-columns";
import { UserData } from "@/types/user";

function FacultyRecordsLists() {
    const { facultyId, dep } = useParams()
    const [searchParams] = useSearchParams()

    const q = searchParams.get('q')

    const [forms, setForms] = useState<FacultyFormsLists[]>([])
    const [loading, seLoading] = useState<boolean>(true)
    const [userData, setUserData] = useState<UserData>({}) 

    useEffect(() => {
        const getAllQualityRecords = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}quality-records/get-faculty-records/${userData.role}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    validateStatus: (status => status < 500)
                })

                if(res.status === 200){
                    setForms(res.data)
                }else{
                    toast(res.data)
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong', {
                    description: 'Please try again later.',
                    descriptionClassName: '!text-neutral-600'
                })
            } finally {
                seLoading(false)
            }
        }

        const getFacultyDetails = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}auth/get-specific-user/${facultyId}`, {
                    validateStatus: status => status < 500,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(res.status === 201){
                    toast.warning('Access denied.', {
                        description: 'Please log in again.',
                        descriptionClassName: '!text-neutral-600'
                    })
                }else if(res.status === 404){
                    toast.error("User doesn't exists.")
                    setTimeout(() => {
                        history.back();
                    }, 1000);
                }else{
                    setUserData(res.data)
                }
            } catch (error) {
                console.log(error)
                toast.error('Server error', {
                    description: 'Please try again later.',
                    descriptionClassName: '!text-neutral-600'
                })
            }
        }
 
        if(facultyId){
            getFacultyDetails()
        }

        if(userData.role){
            getAllQualityRecords()
        }
    }, [facultyId, userData.role])

    if(q !== 'quality-records') return <Navigate to={`/${dep}`} />

    return (
        <>
            <h1 className="font-bold text-2xl">{[userData.firstName, userData.middleName, userData.lastName, userData.suffix].filter(Boolean).join(' ')} | Quality Records Lists</h1>
            <DataTable columns={columns} data={forms} isLoading={loading} />
        </>
    );
}

export default FacultyRecordsLists;