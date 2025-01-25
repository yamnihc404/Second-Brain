import { ReactElement } from "react"

interface items{
    icon : ReactElement,
    title : string
}

export const SideBarItem = (props : items) => {
    return (
        <div>   
        <div className = "h-7 flex hover:bg-gray-200 m-4 rounded-md pl-6 hover:transition-all duration-500 hover:cursor-pointer items-center">
        <div className="pl-2 pt-1">
        {props.icon}
        </div>
        <div className="pl-9">
        {props.title === "X" ? (<span>Tweets</span>) : props.title === "Youtube" ? (<span>Videos</span>) : null}
        </div>
        </div>
        </div>
    )
}