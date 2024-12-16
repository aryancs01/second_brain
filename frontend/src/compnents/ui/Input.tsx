import { useRecoilValue } from "recoil";
import { buttonType } from "../../atoms/atom";

interface InputProps {
    placeholder:string; 
    refeerence?:any
}

export function Input({placeholder,refeerence}:InputProps){
    return <div>
        {
            (placeholder === "Description")?
            <textarea ref={refeerence} placeholder={placeholder} rows={5} cols={10} className="w-full px-3 py-2 border rounded mt-2 resize-none" />
            :
            <input ref={refeerence} placeholder={placeholder} type="text" className="w-full px-4 py-2 border rounded m-2" />
        }
       
    </div>
}