import { Input } from "./PopUp";
import { Button } from "./Button";
import {useRef} from "react";
import { BACKEND_URL } from "../Config/urls";
import axios from 'axios';


export const Signup = ()=>{

    let usernameRef = useRef<HTMLInputElement>();
    let passwordRef = useRef<HTMLInputElement>();


    async function handleclick(){
        const payload ={
        username : usernameRef.current?.value,
        password : passwordRef.current?.value
        }
        try {
          await axios.post(`${BACKEND_URL}/api/brain/signup`, payload);
          alert('Successfully Signed Up');
      } catch (error) {
          if ((error as any).response) {
            console.log((error as any).response.data.messages);
            if ((error as any).response.data.messages) {
                 (error as any).response.data.messages.forEach((msg: any) => alert('Validation error: ' + msg));
              } 
            else if ((error as any).response.data.message) {
                 
                  alert('Error: ' + (error as any).response.data.message);
              }
          } 
          else {
              alert('An unexpected error occurred');
          }
      }
      
  }
    return (
    <div className="flex flex-col justify-center  h-screen w-screen items-center">
    <span className="font-semibold text-xl pb-7">Brainly Sign Up</span>
    <div className="bg-white-300 w-72 h-80 mb-7 rounded-lg border-2 border-gray-200">
                    <div className = 'h-4'></div>
                    <div className = 'h-4'></div>
                    <div className = 'h-2'></div>
                    <Input reference = {usernameRef} placeholder = 'Username'/>
                    <div className = 'h-4'></div>
                    <Input reference = {passwordRef} placeholder = 'Password'/>
                    <div className ='h-6'></div>
                    <div className = 'flex justify-center'>
                    <Button onClick = {handleclick}type = "submit" text = 'Submit' color = 'primary' size = 'lg'/>
                    </div>
    </div>
    </div>
    );
}


