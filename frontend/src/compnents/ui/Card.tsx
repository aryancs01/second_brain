import { ReactElement } from "react"

interface CardIcons {
    startIcon:ReactElement,
    shareIcon:ReactElement,
    deleteIcon:ReactElement,
    title:string,
    link?:string,
    description?:string,
    type:string,
    date:string,
    time:string
}

export function Card({startIcon,title,shareIcon,deleteIcon,link,description,type,date,time}:CardIcons){
    return <div className={`w-80 border rounded p-4 ${(type === "twitter")?"":"h-72"}`}>
        <div className="flex justify-between pl-3  ">
            <div className="flex gap-2">
                <div className="text-gray-700">{startIcon}</div>
                <div className="text-gray-800 cursor-pointer">{title}</div>
            </div>
            <div className="flex gap-3 text-gray-700">
                <div>
                    <a href={link} target="_blank" >
                        {shareIcon}
                    </a>
                </div>
                <div className="cursor-pointer">{deleteIcon}</div>
            </div>
            
        </div>
        
        <div className={` py-4 pr-2 ${(type === "twitter")?"":"h-52 scrollbar overflow-scroll"}`}>
            {(type==="youtube" && link) && <iframe className="w-full rounded-md " 
            src={`http://www.youtube.com/embed/${link.split("?v=")[1]}`} 
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>}

            {(type==="twitter" && link) && <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")}></a> 
            </blockquote> }

            {type==="note" && <p className="p-5">
                {description}    
            </p>}
        </div>
        <div className="flex justify-between  text-gray-600 ">
            <div>
                {date}
            </div>
            <div>
                {time}
            </div>
            
        </div>
    </div>
}