import { useState } from "react";
function BlogTitle({content,setContent}){
    const [editTitle,setEditTitle] = useState(true);
    const handleTitleChange = (e) => {
        setContent((prevContent)=>({
            ...prevContent,
            title:e.target.value
        }))
    }
    return(
        <>
            {
                editTitle || content.title === "" ?
                    <input 
                        style={{marginBlockEnd:'.75em'}}
                        type="text"
                        id="blog-title"
                        name="blog-title"
                        placeholder="Enter the blog title..."
                        onChange={handleTitleChange}
                        className="w-100 no-outline no-border no-bg text-white fs-7 font-weight-600 text-centered uppercase pointer"
                        onBlur={()=>setEditTitle(false)}
                        autoFocus
                        value={content.title}
                    /> 
                    :
                    <h2 onClick={()=>setEditTitle(true)} className="fs-7 font-weight-600 text-centered uppercase pointer">{content.title}</h2>
            }
        </>
    );
}
export default BlogTitle;