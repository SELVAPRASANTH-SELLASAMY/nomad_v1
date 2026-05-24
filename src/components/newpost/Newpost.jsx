import { useContext, useEffect, useState } from 'react';
import { Select } from '../../sharedUi/select';
import ActionButton from './ActionButton';
import Editor from '../editor/Editor';
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../customhooks/httpMethod";
import { useBlogCategory } from '../../store/BlogStore';
import PrimaryInput from '../../sharedUi/PrimaryInput';
import { BlogContext } from '../../contexts/BlogProvider/BlogContext';
function Newpost(){
    const {content,setContent} = useContext(BlogContext);

    const categories = ["--Select--",...useBlogCategory(state => state.categories).filter(item => item !== "All"),"Other"];
    const fetchCategories = useBlogCategory(state => state.fetchCategories);

    useEffect(() => {
        fetchCategories();
    },[]);

    const [category,setCategory] = useState(categories[0]);

    const [queryParams] = useSearchParams();

    const edit = queryParams.get("edit");
    const { data, error, isPending } = useFetch(edit ? `blog/getcontent?id=${edit}` : null);

    useEffect(()=>{
        if(data?.data){
            setContent({...(data.data),copy:(data.data),id:edit});
        }
    },[data,edit]);

    useEffect(() => {
        setContent((prev) => ({
            ...prev,
            category: category
        }));
    },[category]);

    useEffect(() => {
        if(content.category){
            setCategory(content.category);
        }
    },[content.category]);

    return(
        edit && (isPending || error) 
        ? 
            <p className="fs-5 mt-5 font-weight-600 uppercase text-secondary">{isPending ? 'Please Wait...' : error}</p> 
        :
        <>
            <section className="bg-common-blue w-100 pb-15">
                <h2 className="fs-6 mt-5 mt-4_L_500 font-weight-600 uppercase">New post</h2>
                <div className="toolbar d-flex flex-col_L_550 gap-2 row-gap-1 w-100 mt-05">
                    <div>
                        {
                            content.category === "Other" ? 
                            <PrimaryInput
                                id="category"
                                type="text"
                                placeholder="Category"
                                setValue={setContent}
                                variant="small"
                            />
                            :
                            <Select
                                name="Category"
                                options={categories}
                                value={category}
                                setValue={setCategory}
                            />
                        }
                    </div>
                    <ActionButton/>
                </div>
            </section>
            <Editor/>
        </>
    );
}
export default Newpost;