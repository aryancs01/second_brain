import { BrainIcon } from "../../icons/BrainIcon"

export function Sidebar(){
    return <div className="fixed top-0 left-0 w-60 border p-4 h-screen">
        <div className="flex justify-start items-center gap-3">
            <div className="text-blue-600">
                <BrainIcon size="xl"/>
            </div>
            <h4 className="pt-1 text-xl font-bold">Second Brain</h4>
        </div>

        <div>
            
        </div>
    </div>
}