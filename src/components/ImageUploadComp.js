import { useEffect, useState, useRef } from "react";
import 'bulma/css/bulma.css'
import FileResizer from "react-image-file-resizer";

export default function ImageUploadComp(props, {reset}){
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const backend = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    const dataFetchedRef = useRef(false);
    const[ content, setContent] = useState("");

    const buttonClicked = useRef(false);
    const [id, setId] = useState("")
    const[ dataUrl, setDataUrl] = useState("");
    const [fileUpload, setFileUpload] = useState("Choose an image...");

    function handleFileOnChange(e) {
        setFileUpload(e.target.files[0].name);
        
    }

    useEffect(() => {
        setFileUpload("Choose an image...");
    }, [reset]);


    // useEffect(()=>{
    //     if(buttonClicked.current){
    //         console.log("making PATCH request from DB");
    //         console.log(backend+`/plants`);
    //         console.log(dataUrl)
    //         fetch(backend+`/plants/1879c3110a3-mvwza0lw6471kx`, {
    //             method:"PATCH",
    //             headers: {
                    
    //                 'Content-Type': 'application/json', 
    //             },
    //             body: JSON.stringify({
                    
    //                 image: dataUrl
    //             })
    //         }).then(response => response.json())
    //         .then(json =>{
    //             console.log(json);
    //             setId(json._id);
    //             buttonClicked.current = false;
    //         });
    //     }
    // },[dataUrl]);

    // useEffect(()=>{
    //     if(id !== ""){
    //         console.log("making GET request from DB");
    //         console.log(backend+`/plants/${id}`);
    //         fetch(backend+`/plants/${id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json', 
    //             },
    //         }).then(response => response.json())
    //         .then(json =>{
    //             console.log(json);
    //             setId(json._id);
    //             setContent(json.image);
    //         });
    //         dataFetchedRef.current = true;
    //     }
    // },[id]);


    function uploadHandle(e){
        e.preventDefault();
        const fileInput = document.getElementById('imageField'); 
        const upload_image = fileInput.files[0];  // get the file from font-end
        // FileResizer.imageFileResizer(
        //     upload_image, //file name
        //     400, //max pixel width
        //     400, //max pixel height
        //     "JPEG", //compression format
        //     100, //quality
        //     0, //rotation
        //     (resizedFile) => {
        //         //Callback function
                
        //         setDataUrl(URL.createObjectURL(resizedFile));
        //         console.log('hi there')
        //         props.setImage(dataUrl)
        //     },
        //     "base64" //output type
        // );
        
        let reader = new FileReader();
        reader.onloadend = function() {  
            setDataUrl(reader.result);
            props.setImage(reader.result)
            buttonClicked.current = true; 
        }     
        reader.readAsDataURL(upload_image);
    }
     
    
    
    return(
        <div className='container'>
            <div>
                    <div className="file is-boxed">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name="image"
                                id="imageField"
                                required="required"
                                accept="image/*"
                                onChange={handleFileOnChange}
                            />
                            <span className="file-cta">
                                <span className="file-label">{fileUpload}</span>
                            </span>
                        </label>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button
                                value="Upload"
                                className="button is-link"
                                onClick={uploadHandle}
                            >Upload</button>
                        </div>
                    </div>
            </div>
            {dataFetchedRef.current && <>
                <p>Image from the database</p>
                <img src={content} alt="Base64 uploaded" width="500"/>
            </>}
        </div>

    )

}