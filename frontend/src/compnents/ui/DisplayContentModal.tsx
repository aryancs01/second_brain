import { modal,buttonType } from "../../atoms/atom";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import {useSetRecoilState,useRecoilValue } from "recoil";
import { Input } from "./Input";
import { useRef } from "react";
import axios from "axios";
import { useContent } from "../../hook/useContent";


export function DisplayContentModal(){
    const setClose = useSetRecoilState(modal);
    const setType = useSetRecoilState(buttonType);
    const linkRef = useRef<HTMLInputElement>();
    const titleRef = useRef<HTMLInputElement>();
    const decscriptionRef = useRef<HTMLInputElement>();
    const type1 = useRecoilValue(buttonType)
    const {refresh} = useContent();

    function closeModal(){
       setClose(false)
    }

    function putData(){
        const type = type1
        const title = titleRef.current?.value;
        const description = decscriptionRef.current?.value;
        const link = linkRef.current?.value
        axios.post("http://localhost:4000/user/content",{
            type:type,
            title:title,
            link:link,
            description:description,
            tag:[]
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })

        closeModal();
        refresh()
    }

    return <div >
        <div className="h-screen w-full absolute bg-gray-50 flex justify-center items-center ">
                <div className="w-96 bg-white p-5 rounded-md">
                    <div className="flex mb-1">
                        <button onClick={closeModal} className="mb-1">{<CrossIcon size="xl"/>}</button>
                    </div>
                    <div className="flex justify-center gap-3 p-2">
                        <div className="">
                            <Button variant={useRecoilValue(buttonType) === "youtube"?"primary":"secondary"}
                                text="Youtube"
                                size="md"
                                onclick={()=>{
                                    setType("youtube")
                                }}
                            />
                        </div>
                        
                        <div className="">
                            <Button variant={useRecoilValue(buttonType) === "twitter"?"primary":"secondary"}
                                text="Twitter"
                                size="md"
                                onclick={()=>{
                                    setType("twitter")
                                }}
                            />
                        </div>

                        <div>
                            <Button variant={useRecoilValue(buttonType) === "note"?"primary":"secondary"}
                                text="Note"
                                size="md"
                                onclick={()=>{
                                    setType("note")
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-5" >
                        {(useRecoilValue(buttonType) === "note") ?
                        <Input refeerence={decscriptionRef} placeholder="Description"/>
                        :
                        <Input refeerence={linkRef} placeholder="Link"/>
                        }
                    </div>

                    <div>
                    <Input refeerence={titleRef} placeholder="Title"/>
                    </div>

                    <div className="w-full flex justify-center">
                        <Button variant="primary" size="md" text="Submit" onclick={putData}/>
                    </div>
                </div>
        </div>
    </div>
}