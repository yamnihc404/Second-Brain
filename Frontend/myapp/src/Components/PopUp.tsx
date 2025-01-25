import { ReactHTMLElement, useState, useRef } from 'react';
import {CloseIcon} from '../Icons/icons';
import {Button} from './Button';
import axios from 'axios';
import { BACKEND_URL } from '../Config/urls';


interface PopUpProps{
    open: boolean,
    onClose : () => void; 
}

interface InputProps{
    placeholder: string,
    reference ? : any
}



export const PopUp = (props : PopUpProps) => {
    const [type , setType] = useState('youtube');
    const  titleref = useRef<HTMLInputElement>();
    const  linkref = useRef<HTMLInputElement>();


    async function handleclick(){
        let payload = {
            title: titleref.current?.value,
            link: linkref.current?.value,
            type : type,
        }
        let headers = {
            Authorization: localStorage.getItem("token")
        }
        try{
        await axios.post(`${BACKEND_URL}/api/brain/content`, payload, {headers}).then(() => {console.log('Content added succesfully')}) 
        }
        catch(error){
         alert((error as any).response.data.message);
        }
    }

    return (
        <>
        {props.open && <div className = "w-screen h-screen bg-slate-600 bg-opacity-50 fixed flex justify-center items-center z-50">
            <div className="bg-white-300 w-72 h-80 mb-7 rounded-lg">
                <div><button className = 'm-2 w-fit h-fit rounded-full hover:cursor-pointer hover:bg-slate-200' onClick={props.onClose}><CloseIcon/></button></div>
                <div className = 'h-2'></div>
                <Input reference = {titleref} placeholder = 'Title'/>
                <div className ='h-4'></div>
                <Input reference = {linkref} placeholder = 'Link'/>
                <div className ='h-4'></div>
                <div className='flex justify-center'>Type:</div>
                <div className = "flex gap-4 mt-2 justify-center">
                <Button text = 'Youtube' color={type === 'youtube' ? 'secondary' : 'primary'} onClick = {()=>{setType('youtube')}}size = 'md'/>
                <Button text = 'Tweet' color={type === 'tweet' ? 'secondary' : 'primary'} size = 'md' onClick = {()=>{setType('tweet')}}/>
                </div>
                <div className = 'h-4'></div>
                <div className = 'flex justify-center'>
                <Button onClick= {handleclick}type = "submit" text = 'Submit' color = 'primary' size = 'lg'/>
                </div>
            </div>
        </div>}
        </>
    );
}



export function Input(props : InputProps) {


    return (
        <div className='flex justify-center'>
          <input ref = {props.reference} type = "text" className = "rounded-lg border-2 border-gray-200 outline-none w-60 h-11 p-4" placeholder = {props.placeholder}></input>
        </div>
    );
}

