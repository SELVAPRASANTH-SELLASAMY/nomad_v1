import { useEffect, useState } from "react";
import { BlogContext } from "./BlogContext";

function BlogProvider({children}){
    const [content,setContent] = useState({
        title:'',
        thumbnail: null,
        content:'',
        published:false,
        category:''
    });

    return(
        <BlogContext.Provider value={{content,setContent}}>
            {children}
        </BlogContext.Provider>
    );
}

export default BlogProvider;