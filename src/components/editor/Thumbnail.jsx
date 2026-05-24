import { useContext, useRef, useState } from "react";
import { BlogContext } from "../../contexts/BlogProvider/BlogContext";
function Thumbnail(){
    const {content,setContent} = useContext(BlogContext);

    const fileInput = useRef(null);

    const handleClick = () => {
        fileInput?.current && fileInput.current.click();
    }

    const handleFileChange = (e) => {
        if(e.target.files.length > 0){
            setContent({...content,thumbnail: e.target.files[0]});
        }
    }

    return(
        <>
            <p onClick={handleClick} className="fs-4 pointer w-fit w-max-600 w-max-428_L_768 w-max-300_L_500 mt-05 hide-overflow white-space-no-wrap ellipsis">{
                (!content?.thumbnail) ? 'Click to choose thumbnail'
                : <><span>Thumbnail: </span><span className="text-secondary fs-3">{content?.thumbnail?.name || content?.thumbnail}</span></>
            }</p>
            <input 
                ref={fileInput}
                onChange={handleFileChange} 
                className="d-none fs-5" 
                type="file" 
                id="thumbnail" 
                accept="image/*"
            />
        </>
    );
}

export default Thumbnail;