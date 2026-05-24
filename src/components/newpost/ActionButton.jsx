import { useContext, useState } from "react";
import { Option } from "../../sharedUi/select";
import { RiSave3Line, RiUploadCloud2Line, RiDownloadCloud2Line } from "react-icons/ri";
import { usePost, useUpdate } from "../../customhooks/httpMethod";
import { validateContent } from "./Validation";
import { useAlert } from "../../store/zustandStore";
import useWindowWidth from "../../customhooks/useWindowWidth";
import { MobileOption } from "../../sharedUi/select";
import { BlogContext } from "../../contexts/BlogProvider/BlogContext";
function ActionButton(){
    const {content,setContent} = useContext(BlogContext);
    const windowWidth = useWindowWidth();
    const alert = useAlert(state => state.handleAlert);
    const { post } = usePost('blog/add');
    const { update } = useUpdate(content.id ? `blog/update?id=${content.id}` : null);

    const toBase64 = (file) => {
        if(file){
            if(typeof file !== 'string'){
                const reader = new FileReader();
                reader.readAsDataURL(file);
                const result = reader.result;
                return result ? result : null;
            }
            else{
                return file;
            }
        }
        return null;
    }

    const saveBlog = async() => {
        if("copy" in content){
            const formData = new FormData();
            Object.keys(content.copy).forEach((key) => {
                if(key === "thumbnail" && (toBase64(content[key]) !== toBase64(content.copy[key]))){
                    formData.append(key,content[key]);
                }
                else if(key !== "published" && (content[key] !== content.copy[key])){
                    formData.append(key,content[key]);
                }
            });
            
            if(Array.from(formData.entries()).length > 0){
                update(formData,() => {
                    setContent((prev) => {
                        const {title, content, category, thumbnail} = prev;
                        prev.copy = {title, content, category, thumbnail};
                        return {...prev};
                    });
                });
            }
        }
        else{
            const formData = new FormData();
            Object.keys(content).forEach((key) => {
                formData.append(key,content[key]);
            })
            post(formData);
        }
    }

    const handlePublish = () => {
        update({published:!(content.published)},() => {
            setContent((prev) => ({
                ...prev,
                published:!(prev.published)
            }));
        });
    }

    const actions = [
        {icon:<RiSave3Line/>,name:"Draft"},
        {icon:content.published ? <RiDownloadCloud2Line/> : <RiUploadCloud2Line/>,
              name:content.published ? "Un publish" : "Publish"}
    ];

    const functionality = {
        "Draft":saveBlog,
        "Publish":handlePublish,
        "Un publish":handlePublish
    }

    const handleAction = (cb) => {
        const isValid = validateContent(content);
        const { state } = isValid;
        if(state){
            cb();
        }
        else{
            const { message } = isValid;
            alert(message,false);
        }
    }

    const [value,setValue] = useState(actions[0]);
    const [expand,setExpand] = useState(false);

    return(
        <>
            <div className="w-10rem relative ml-auto ml-0_L_550">
                <button onClick={() => handleAction(functionality[value.name])} type="button" className='fs-4 bg-green rounded-05 ptb-025 plr-1 text-black font-weight-600 d-flex center-y gap-05 w-fit justify-center pointer uppercase ml-auto ml-0_L_550 text-no-wrap'>
                    <span>{value.name}</span>
                    <span tabIndex="0" onClick={(e)=>e.stopPropagation()} onFocus={()=>setExpand(true)} onBlur={()=>setExpand(false)}>| &#9660;</span>
                </button>
                {(expand && windowWidth > 768) &&
                    <Option actions={actions} setValue={setValue} value={value}/>
                }
            </div>
            {
                (windowWidth <= 768) && 
                <MobileOption onClick={() => setExpand(false)} expand={expand}>
                    <Option actions={actions} setValue={setValue} value={value}/>
                </MobileOption>
            }
        </>
    );
}
export default ActionButton;