import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { UserData } from "@/types/user";
import { Folder } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ControlForm2 } from '@/types/control-form'

function FacultyLists() {
    const { dep, id } = useParams()
    const [searchParamgs] = useSearchParams()
    const q = searchParamgs.get('q')


    // getFaculties
    const [faculties, setFaculties] = useState<UserData[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getDepFaculties = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}faculties/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    validateStatus: (status => status < 500)
                })

                if (res.status === 200) {
                    setFaculties(res.data)
                } else if (res.status === 201) {
                    toast('Access denied', {
                        description: 'Please login again.',
                        descriptionClassName: '!text-neutral-600'
                    })
                } else {
                    setFaculties([])
                }
            } catch (error) {
                console.log(error)
                toast.error('Server error', {
                    description: 'Something went wrong. Please try again later',
                    descriptionClassName: '!text-neutral-600'
                })
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            getDepFaculties()
        }
    }, [id])

    // get forms and recors
    const [forms, setForms] = useState<ControlForm2[]>([])
    useEffect(() => {
        const getForms = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_ENDPOINT + q}/get`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    validateStatus: (status => status < 500)
                })

                if(res.status === 200){
                    setForms(res.data)
                }else{
                    setForms([])
                }
            } catch (error) {
                console.error(error)
            }
        }

        if(q){
            getForms()
        }
    }, [q])

    // check if user has pending form
    const hasPendingForm = (userId: any, role: any) => {
        const assignedForm = forms.filter(form => form.roles.includes(role)) 
        const dateNow = new Date()

        if(!assignedForm.length){
            return false
        }

        const hasPending = forms.some(form => {
            const dateDue = new Date(form.dueDate)
            return !form.filledOut.includes(userId) && dateDue > dateNow
        }) 
        
        if(hasPending) return true

        return false
    }

    const hasLateForm = (userId: any, role: any) => {
        const assignedForm = forms.filter(form => form.roles.includes(role)) 
        const dateNow = new Date()

        if(!assignedForm.length){
            return false
        }

        const hasLate = forms.some(form => {
            const dateDue = new Date(form.dueDate)
            return !form.filledOut.includes(userId) && dateDue < dateNow
        }) 
        
        if(hasLate) return true

        return false
    }

    return (
        <>
            <h1 className="font-bold text-2xl">Faculty Lists of <span className="capitalize">{dep?.replace(/-/g, ' ')}</span></h1>

            <div className="flex flex-wrap gap-5">
                {loading ? (
                    Array.from({ length: 5 }, (_, index) => (
                        <Skeleton key={index} className="w-50 h-33 border rounded-xl" />
                    ))
                ) : (faculties.length ? (
                    q === 'controlled-forms' ? (
                        faculties.length && faculties?.map((faculty) => (
                            <Link to={`/${dep}/faculty-form-lists/${faculty._id}?q=${q}`} key={faculty._id}>
                                <Card className="flex flex-col gap-y-1 items-center w-fit p-5 cursor-pointer hover:border hover:border-main relative">
                                    <Folder size='60' />
                                    <p className="font-medium">{[faculty.firstName, faculty.middleName, faculty.lastName].filter(Boolean).join(' ')}</p>
                                    <p className="text-sm">{faculty.role}</p>
                                    <div className="absolute top-0 right-2 p-0 space-x-1">
                                        {hasLateForm(faculty._id, faculty.role) && <Badge className="!h-3 aspect-square p-0 rounded-full"></Badge>}
                                        {hasPendingForm(faculty._id, faculty.role) && <Badge className="!h-3 aspect-square p-0 rounded-full bg-orange-500"></Badge>}
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : q === 'quality-records' ? (
                        faculties.length && faculties?.map((faculty) => (
                            <Link to={`/${dep}/faculty-records-lists/${faculty._id}?q=${q}`} key={faculty._id}>
                                <Card className="flex flex-col gap-y-1 items-center w-fit p-5 cursor-pointer hover:border hover:border-main">
                                    <Folder size='60' />
                                    <p className="font-medium">{[faculty.firstName, faculty.middleName, faculty.lastName].filter(Boolean).join(' ')}</p>
                                    <p className="text-sm">{faculty.role}</p>
                                    <div className="absolute top-0 right-2 p-0 space-x-1">
                                        {hasLateForm(faculty._id, faculty.role) && <Badge className="!h-3 aspect-square p-0 rounded-full"></Badge>}
                                        {hasPendingForm(faculty._id, faculty.role) && <Badge className="!h-3 aspect-square p-0 rounded-full bg-orange-500"></Badge>}
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <Navigate to={`/${dep}`} />
                    )
                ) : 'No faculties found' )}
            </div>
        </>
    );
}

export default FacultyLists;