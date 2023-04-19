import { useEffect, useState, useRef } from "react";
import 'bulma/css/bulma.css'

export default function imageComp(){
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const backend = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    const buttonClicked = useRef(false);
    const[ dataUrl, setDataUrl] = useState("");
    const [fileUpload, setFileUpload] = useState("Choose an image...");



    useEffect(()=>{
        if(buttonClicked.current){
            console.log("making POST request from DB");
            console.log(API_ENDPOINT+`/image`);
            fetch(API_ENDPOINT+`/image`, {
                method:"POST",
                headers: {
                    
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    name: imageName,
                    content: dataUrl
                })
            }).then(response => response.json())
            .then(json =>{
                console.log(json);
                setId(json._id);
                buttonClicked.current = false;
            });
        }
    },[dataUrl]);

    function uploadHandle(file){
        const fileInput = document.getElementById('imageField'); 
        const upload_imaged = fileInput.files[0];  // get the file from font-end
        let reader = new FileReader();
        reader.onloadend = function() {     // call back to set your state variables
            setDataUrl(reader.result); 
        }     
        // save the result in the state dataUrl
        // your business logic
    }
     
    }
    
    return(
        <div class='container'>

        </div>

    )

}