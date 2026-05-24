import { useContext, useEffect, useRef } from "react";
import 'quill/dist/quill.snow.css';
import Quill from "quill";
import { QuillConfig } from './editorConfig';
import './editor.css';
import { debounce } from "lodash";
import BlogTitle from "./BlogTitle";
import Thumbnail from "./Thumbnail";
import { BlogContext } from "../../contexts/BlogProvider/BlogContext";
function Editor(){
    const {content,setContent} = useContext(BlogContext);

    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(()=>{
        const data = content.content;
        if(data){
            quillInstance?.current && (quillInstance.current.root.innerHTML = data);
        }
    },[content,quillInstance]);

    useEffect(()=>{
        if(!quillInstance.current && editorRef.current){
            quillInstance.current = new Quill(editorRef.current, QuillConfig(quillInstance));

            const toolbar = quillInstance.current.getModule('toolbar').container;
            if(toolbar){
                toolbar.querySelector('.ql-fullscreen-mode').innerHTML = `<svg class='ql-stroke' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>`;
            }
            
            quillInstance.current.on('text-change',debounce(()=>{
                setContent((prevContent)=>({
                    ...prevContent,
                    content:quillInstance.current.root.innerHTML
                }));
            },1000));
        }
    },[setContent]);
    
    return(
        <section className="nomad-editor">
            <BlogTitle/>
            <Thumbnail/>
            <br />
            <div className="quill-element mb-25">
                <div ref={editorRef}/>
            </div>
        </section>
    );
}
export default Editor;