import { useEffect } from 'react';
import { useUser } from '../../store/zustandStore';
import Lazyimage from '../lazyimage/Lazyimage';
import BlogOptions from './Manageblog';
import { useNavigate } from 'react-router-dom';
function Blogtile({blog}){
    const authorName = useUser(state => state.user?.name);
    const authorAvatar = useUser(state => state.user?.image);
    const navigate = useNavigate();
    const gotoBlog = () => {
        navigate(`/blog?id=${blog._id}`);
    }

    const setDate = () => {
        const date = new Date(blog.createdAt);
        const day = String(date.getDate()).padStart(2,'0');
        const month = String(date.getMonth() + 1).padStart(2,'0');
        const year = String(date.getFullYear()).padStart(2,'0');
        return `${day}-${month}-${year}`;
    }
    return(
        <div onClick={gotoBlog} className='bg-tile-blue p-1 rounded-1 d-flex flex-col gap-05 relative border-grey-005'>
            <BlogOptions id={blog._id}/>

            <Lazyimage 
                componentClass={'w-100 rounded-top-1 hide-overflow aspect-ratio-21 d-flex justify-center'} 
                placeholder={blog.placeholderThumbnail} 
                source={blog.thumbnail}
                altText={`${blog.title} thumbnail`}
            />

            <h6 title={blog.title} className='fs-4 font-weight-500 webkit-vbox line-clamp-1 hide-overflow ellipsis'>{blog.title}</h6>
            {/* <div className='fs-3 d-iflex justify-space-between'>
                <p className='text-gold'><span className='mr-025'>&#9733;</span>4.5</p>
                <p className='text-secondary'><span className='mr-025'>&#x1F441;</span>4500</p>
            </div> */}
            <div className='fs-3 d-iflex justify-space-between'>
                <p className='text-secondary'>{blog.category}</p>
                <p className='text-secondary'>{setDate()}</p>
            </div>
            <hr className='border-grey-005 mtb-025'></hr>
            <div id='author' className='d-flex center-y gap-05'>
                <span className="w-015rem aspect-ratio-equal rounded-100px bg-light-blue d-grid center-y justify-center hide-overflow">
                    {authorAvatar && <img className="w-015rem" src={`${import.meta.env.VITE_REACT_APP_API_URL}\\${authorAvatar}`} alt="profile-picture" />}
                </span>
                <p id='author-name' className='fs-4 uppercase'>{authorName || "Unknown"}</p>
            </div>
        </div>
    );
}
export default Blogtile;