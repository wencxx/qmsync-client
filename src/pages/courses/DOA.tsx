import { useState } from "react"
import { Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

function DepartmentOfArchitecture() {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

    const handleFolderClick = (folderName: string) => {
        setSelectedFolder(folderName)
    }

    return (
        <>
            <h1 className="font-bold text-2xl">Department of Architecture Storage</h1>

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
                        <Link to="/department-of-architectures/faculty-lists/67e6aa2ab5d09db7e19297c6?q=controlled-forms">
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
                        <Link to="/department-of-architectures/faculty-lists/67e6aa2ab5d09db7e19297c6?q=quality-records">
                            <Button className="mt-4">Open Folder</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default DepartmentOfArchitecture;

