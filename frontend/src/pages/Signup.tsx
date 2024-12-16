import { useRef } from "react";
import { Button } from "../compnents/ui/Button";
import { Input } from "../compnents/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const emailRef = useRef<HTMLInputElement>();
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signUp(){
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post("http://localhost:4000/user/signup",{
            email:email,
            username:username,
            password:password
        })

        if(response.data.status){
            navigate("/signin")
        }
    }
    
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center bg-purple-600 p-5 pr-10 rounded-md">
            <h3 className="text-4xl text-white font-bold">Signup</h3>
            <Input refeerence={emailRef} placeholder="Enter Email"/>
            <Input refeerence={usernameRef} placeholder="Enter Username"/>
            <Input refeerence={passwordRef} placeholder="Enter Password"/>
            <Button variant="tertiary" text="Submit" size="lg" onclick={signUp}/>
        </div>
    </div>
}