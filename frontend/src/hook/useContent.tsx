import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
    const [content,setContent] = useState([]);

    async function refresh(){
        const response = await axios.get("http://localhost:4000/user/content",{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })

        setContent(response.data.response)
    }

    useEffect(()=>{
        refresh();
    },[])

    return content;
}