import { useEffect, useRef } from 'react';
function Lazyimage({componentClass,source,placeholder,onClick,altText}){
    const absoluteUrl = import.meta.env.VITE_REACT_APP_API_URL + "/";
    const image = useRef();
    useEffect(()=>{
        if(!source) return;
        const img = image.current;
        const setsrc = () => {
            if(img){
                img.src = absoluteUrl + source;
                img.removeEventListener('load',setsrc);
            }
        }
        img.complete ? setsrc() : img.addEventListener('load',setsrc);
        return ()=> img.removeEventListener('load',setsrc);
    },[source]);

    return(
        <div style={{alignItems:"flex-start"}} className={componentClass}>
            <img loading='lazy' className='w-100' onClick={onClick && onClick} ref={image} src={absoluteUrl+placeholder} alt={altText} />
        </div>
    );
}
export default Lazyimage;