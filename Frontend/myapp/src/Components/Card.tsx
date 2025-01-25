import {DocIcon, TrashIcon, ShareIcon} from '../Icons/icons';
import {convertToEmbedLink } from './utils';
import axios from 'axios';
import { BACKEND_URL } from '../Config/urls';

interface CardProps {
    title : String,
    link : String,
    type : String,
    tag: String
} 

export const Card = (props: CardProps) => {
    return (
        <div className='w-80 h-80 bg-white-300 border-2 border-gray-200 shadow-sm rounded-md m-6 overflow-hidden'>
            <div className='flex justify-between items-center p-2'>
                <div className='opacity-65'>
                    <DocIcon />
                </div>
                <div className='font-semibold max-w-50  p-1 break-words text-center'>
                    {props.title}
                </div>
                <div className='flex gap-2 '>
                    <button className = "opacity-30  hover:opacity-100 transition-opacity duration-200"><ShareIcon /></button>
                    <button onClick={async ()=>{
                        let headers = {
                            Authorization : localStorage.getItem("token")
                        }
                        await axios.delete(`${BACKEND_URL}/api/brain/content`, {
                            headers,
                            data: { contentId: props.tag },  
                          })
          .then((response)=>{alert(response.data.message);});
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
