import { ReactElement } from "react";

interface buttonProps {
    variant:"primary" | "secondary" |"tertiary";
    size:"sm"|"md"|"lg"|"xl";
    text:string;
    onclick?:()=>void;
    startIcon?:ReactElement;
    endIcon?:ReactElement
}

const variantStyles = {
    "primary":"bg-purple-400 text-white",
    "secondary":"bg-blue-500 text-white",
    "tertiary":"bg-purple-400 text-white"
}

const sizeStyle = {
    "sm":"px-2 py-1",
    "md":"px-3 py-2",
    "lg":"px-4 py-3",
    "xl":"px-5 py-4"
}

const defaultStyles = "rounded text-lg font-bold flex item-centre justify-center gap-2"

export function Button({variant,size,text,onclick,startIcon,endIcon}:buttonProps){
    return <button onClick={onclick} className={`
        ${variantStyles[variant]} ${sizeStyle[size]} ${defaultStyles}
        `
    }>{startIcon}{text}</button>
}