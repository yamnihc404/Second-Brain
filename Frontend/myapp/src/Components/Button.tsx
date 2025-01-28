import { ReactElement } from "react";
import { Type } from "typescript";


interface ButtonProps{
    text ?: string;
    color ?: 'primary' | 'secondary';
    size ?: 'sm' | 'md' |'lg';
    icon ?: ReactElement
    onClick ? : () => void,
    type ?: "submit" | "reset" | "button" | undefined
    
}



export const Button = (props : ButtonProps) =>{

    const colorvariants = {
        primary : 'bg-purple-200 text-purple-700',
        secondary : 'bg-purple-600 text-white-200'
    }
    
    const sizevariants = {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg"
    }
    const defaltstyle = "rounded-md Display flex items-center transition:all duration-300"


    return (
        <>
        <button type = {props.type} onClick = {props.onClick}className = {`${props.color? colorvariants[props.color] : null} ${ props.size ? sizevariants[props.size] : null} ${defaltstyle}`}> {props.icon ? <div className = "pr-2">{props.icon}</div> : null} {props.text} </button>
        </>
    );
}