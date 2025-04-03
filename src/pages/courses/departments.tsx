import { useState } from "react"
import { Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

const depId: any = {
  'department-of-architectures': '67e6aa2ab5d09db7e19297c6',
  'department-of-industrial-engineering': '67e6aa7a8ef633b881f12401',
  'department-of-chemical-and-mining-engineering': '67e6aaa98ef633b881f12403',
  'department-of-civil-and-geodetic-engineering': '67e6aac98ef633b881f12405',
  'department-of-electrical-engineering': '67e82a42f582f7a3535396f7',
  'department-of-electronics-engineering': '67e82a60f582f7a3535396f9',
  'department-of-mechanical-engineering-and-mechatronics': '67e82a79f582f7a3535396fb'
}

function Departments() {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
    
    const { dep } = useParams()

    const handleFolderClick = (folderName: string) => {
        setSelectedFolder(folderName)
    }

    const department = dep ? dep : 'department-of-architecture'
    const departmentId = dep ? depId[dep] : '67e6aa2ab5d09db7e19297c6'

    return (
        <>
            <h1 className="font-bold text-2xl capitalize">{dep?.split('-').filter(Boolean).join(' ')} Storage</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedFolder === "Controlled Forms" ? "ring-2 ring-primary" : ""
                        }`}
                    onClick={() => handleFolderClick("Controlled Forms")}
                >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <Folder className="h-24 w-24 text-primary mb-4" />
                        <h2 className="text-xl font-semibold">Controlled Forms</h2>
                        <p className="text-muted-foreground mt-2 text-center">Access and manage all controlled form documents</p>
                        <Link to={`/${department}/faculty-lists/${departmentId}?q=controlled-forms`}>
                            <Button className="mt-4">Open Folder</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedFolder === "Quality Records" ? "ring-2 ring-primary" : ""
                        }`}
                    onClick={() => handleFolderClick("Quality Records")}
                >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <Folder className="h-24 w-24 text-primary mb-4" />
                        <h2 className="text-xl font-semibold">Quality Records</h2>
                        <p className="text-muted-foreground mt-2 text-center">Access and manage all quality record documents</p>
                        <Link to={`/${department}/faculty-lists/${departmentId}?q=quality-records`}>
                            <Button className="mt-4">Open Folder</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Departments;

