import { useRef } from "react";
import { Button } from "../compnents/ui/Button";
import { Input } from "../compnents/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signIp(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post("http://localhost:4000/user/signin",{
            email:email,
            password:password
        })

        if(response.data.token){
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
        }
    }
    
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center bg-purple-600 p-5 pr-10 rounded-md">
            <h3 className="text-4xl text-white font-bold">Signin</h3>
            <Input refeerence={emailRef} placeholder="Enter Email"/>
            <Input refeerence={passwordRef} placeholder="Enter Password"/>
            <Button variant="tertiary" text="Submit" size="lg" onclick={signIp}/>
        </div>
    </div>
}