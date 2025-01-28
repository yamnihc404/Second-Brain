import {Button} from './Components/Button.tsx';
import './index.css';
import {ShareIcon, PlusIcon} from './Icons/icons.tsx';
import {Card} from './Components/Card.tsx';
import {PopUp} from './Components/PopUp.tsx';
import {useState} from 'react';
import {SideBar} from './Components/Sidebar.tsx';
import {Signup} from './Components/Signup';
import {Signin} from './Components/Signin.tsx';
import { useContent } from './Hooks/Content.tsx';
import { BACKEND_URL } from './Config/urls.tsx';
import axios from 'axios';


interface ContentType {
  _id: string;
  type: string;
  link: string;
  title: string;
  tag?: string;
  userID?: string;
}



function App(){
  let [open , setOpen] = useState(false);
  let [trash, setTrash] = useState(false);
  let Contents : ContentType[] = useContent({open, delete : trash});
  let [share, setShare] = useState(false);
  
   
  return (
  <div>
   <PopUp open={open} onClose= {()=>{setOpen(false)}}/>
  <div>
   <SideBar/>
  <div className = 'ml-72 bg-white-200'>
    <div className='flex justify-end items-start w-full gap-5 pt-5 pr-10'>
        <Button onClick={() => setOpen(true)} size="md" color="secondary" text="Add Content" icon={<PlusIcon />} />
        <Button size="md" color="primary" text="Share Brain" 
        onClick = {async ()=>{
          let headers = {
            Authorization: localStorage.getItem("token")
        }
          await axios.post(`${BACKEND_URL}/api/brain/share`, {},{headers}).then((response)=>{alert(`Shareable Link: ${response.data.message}` )})}}icon={<ShareIcon />} />
    </div>
    <div className='flex flex-wrap gap-4'>
    {Array.isArray(Contents) ? (
    Contents.map(({ _id,title, link, type }) => (
    <Card key={_id} tag ={_id}type={type} link={link} title={title} remove = {()=>{setTrash(!trash)}}share = {()=>{setShare(!share)}} />
    ))
    ) : (
    <p>Loading content...</p>
    )}
    </div>
  </div>
  </div>
  </div>      
  );
}


export default App
