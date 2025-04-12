import { Button } from "@/components/ui/button";

function Unauthorized() {

    const back = () => {
        window.history.back();
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-y-10">
                <h1 className="text-2xl font-medium uppercase">Not authorized</h1>
                <Button variant='outline' onClick={back}>Go Back</Button>
            </div>
        </>
    );
}

export default Unauthorized;