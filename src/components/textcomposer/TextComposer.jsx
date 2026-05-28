import { useSearchParams } from "react-router-dom";
import './textcomposer.css';
import { useFetch } from "../../customhooks/httpMethod";
import { useCallback, useEffect } from "react";
import Lazyimage from "../lazyimage/Lazyimage";
function TextComposer(){
    const [queryParams] = useSearchParams();
    const Id = queryParams.get("id");
    const { data, error, isPending } = useFetch(`blog/getcontent?id=${Id}`);

    const getFormatedDate = (dt) => {
        const date = new Date(dt);
        const day = String(date.getDate()).padStart(2,'0');
        const month = String(date.getMonth() + 1).padStart(2,'0');
        const year = String(date.getFullYear()).padStart(2,'0');
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        if(data) console.log(data.data.thumbnail);
        if(data) console.log(data.data.placeholderThumbnail);
    },[data]);

    const getFormatedMetaData = useCallback(() => {
        if(data){
            return[
                {Author: data.data.owner.name},
                {Category: data.data.category.charAt(0).toUpperCase() + data.data.category.slice(1).toLowerCase()},
                {"Created At": getFormatedDate(data.data.createdAt)},
                {"Updated At": getFormatedDate(data.data.updatedAt)},
                {Status: data?.data.published ? "Published" : "Not Published"}
            ];
        }
        return null;
    },[data]);

    return(
        <section className="text_composer">
            {
                (isPending || error) ? <p className="fs-5_5 font-weight-600 uppercase text-secondary">{isPending ? 'Please Wait...' : error?.message}</p>
                : data && 
                <>
                    <h2>
                        {data?.data.title}
                        <span className="bottomline"></span>
                    </h2>

                    <Lazyimage 
                        componentClass={'w-100 rounded-top-1 d-flex justify-center'} 
                        placeholder={data?.data?.placeholderThumbnail} 
                        source={data?.data?.thumbnail}
                        altText={`${data?.data?.title} thumbnail`}
                    />

                    <div className="metadata d-flex wrap-flex justify-center row-gap-05 col-gap-3">
                        {
                            getFormatedMetaData()?.map((_,index) => (
                                <p key={index}>
                                    <strong className="font-weight-500 text-white">{Object.keys(getFormatedMetaData()[index])[0]} : </strong> 
                                    {Object.values(getFormatedMetaData()[index])[0]}
                                </p>
                            ))
                        }
                    </div>

                    <div dangerouslySetInnerHTML={{__html:data?.data.content}}></div>
                </>
            }
        </section>
    );
}
export default TextComposer;