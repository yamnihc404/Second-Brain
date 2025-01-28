import {DocIcon, TrashIcon, ShareIcon, XIcon, YIcon,CloseIcon} from '../Icons/icons';
import {convertToEmbedLink } from './utils';
import axios from 'axios';
import { BACKEND_URL } from '../Config/urls';
import { useState } from 'react';
import { useContent } from '../Hooks/Content';

interface CardProps {
    title : String,
    link : String,
    type : String,
    tag: String,
    share : () => void,
    remove : () => void
} 

export const Card = (props: CardProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className='w-80 h-80 bg-white-300 border-2 border-gray-200 shadow-sm rounded-md m-6 overflow-hidden'>
            <div className='flex justify-between items-center p-2'>
                <div className='opacity-65 mt-1 ml-1'>
                    {props.type === 'youtube' ? <YIcon/> : null}
                    {props.type === 'tweet' ? <XIcon/> : null}
                </div>
                <div className='font-semibold max-w-50  p-1 break-words text-center'>
                    {props.title}
                </div>
                <div className='flex gap-2 '>
                    <div className='mt-2 mr-2'><button className = "opacity-30  hover:opacity-100 transition-opacity duration-200" onClick={()=>setShowModal(!showModal)}><div><ShareIcon/></div></button>
     
                       
                     <div className= {`w-screen h-screen bg-black bg-opacity-20 fixed top-0 left-0 z-50 flex justify-center items-center transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>


                     <div className="w-[470px] h-[180px] bg-white-300 rounded-lg">


                            <button onClick={() => setShowModal(!showModal)}><div className=' hover:bg-slate-200 rounded-full mt-2 ml-2 duration-300'><CloseIcon/></div></button>
                            <div className=' m-3 flex justify-center items-center'>

                            <div className='flex flex-col gap-3 items-center w-full'>
                              <div className='w-full'>
                               <input className=' bg-gray-200 w-full h-full border-2 border-black rounded-lg p-3 overflow-scroll scrollbar-none' type='text' readOnly value= {`${props.link}`}></input>
                             </div>
                             <button className="mb-2 w-fit h-fit bg-purple-300 text-white px-4 py-2 rounded-lg"
                                onClick={() => navigator.clipboard.writeText(`${props.link}`)}>
                                Copy Link
                              </button>
                            </div>

                            </div>
                        </div>

                            
                     </div>

            </div>
             
             <button onClick={async ()=>{
                        let headers = {
                            Authorization : localStorage.getItem("token")
                        }
                        await axios.delete(`${BACKEND_URL}/api/brain/content`, {
                            headers,
                            data: { contentId: props.tag },  
                          })
          .then(()=>props.remove())
          }} className = "opacity-30  hover:opacity-100 transition-opacity duration-200"><TrashIcon /></button>

                </div>
            </div>



            <div className='m-5 max-h-56 overflow-y-scroll border-gray-400 border-2 scrollbar-none rounded-lg whitespace-normal'>
                {props.type === "youtube" && (
                    <iframe
                        className='h-full w-full'
                        src={convertToEmbedLink(props.link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}
                {props.type === "tweet" && (
                    <blockquote className="twitter-tweet w-full">
                        <a href={props.link.replace('x', 'twitter')}></a>
                    </blockquote>
                )}
            </div>
        </div>
    );
};
