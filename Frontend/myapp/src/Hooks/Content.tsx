import { useEffect,useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../Config/urls";



interface Contentprops{
  open ?: boolean,
  delete ?: boolean
}
export const useContent = (props : Contentprops) =>{
    const [content, setContent] = useState([]);

    
    useEffect(()=>{
      let headers = {
        Authorization : localStorage.getItem("token")
    }
         axios.get(`${BACKEND_URL}/api/brain/content`, {headers})
          .then((response)=>{console.log(response.data.Content);
            setContent(response.data.Content);})
          .catch((error) => {
             console.error("Error fetching content:", error);
          });
    }, [props.open, props.delete])


    return content;
}
