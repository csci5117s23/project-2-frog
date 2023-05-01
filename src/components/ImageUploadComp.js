import { useEffect, useState, useRef } from "react";
import 'bulma/css/bulma.css'
import FileResizer from "react-image-file-resizer";

export default function ImageUploadComp(props, {reset}){
    const [fileUpload, setFileUpload] = useState("Choose an image...");

    function handleFileOnChange(e) {
        setFileUpload(e.target.files[0].name);
        uploadHandle(e)
    }

    useEffect(() => {
        setFileUpload("Choose an image...");
    }, [reset]);

    function uploadHandle(e){
        e.preventDefault();
        const fileInput = document.getElementById('imageField'); 
        const upload_image = fileInput.files[0];  // get the file from font-end
        FileResizer.imageFileResizer(
            upload_image, //file name
            400, //max pixel width
            400, //max pixel height
            "JPEG", //compression format
            100, //quality
            0, 
            (resizedFile) => {
                //Callback function
                props.setImage(resizedFile)
            },
            "base64" //output type
        );
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
            </div>
        </div>
    )
}