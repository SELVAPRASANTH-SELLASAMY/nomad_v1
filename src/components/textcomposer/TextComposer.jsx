import { useSearchParams } from "react-router-dom";
import './textcomposer.css';
import { useFetch } from "../../customhooks/httpMethod";
import { useCallback, useEffect } from "react";
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


    const getFormatedMetaData = useCallback(() => {
        if(data){
            return[
                {Author: data.data.owner.name},
                {Category: data.data.category.charAt(0).toUpperCase() + data.data.category.slice(1).toLowerCase()},
                {Created: getFormatedDate(data.data.createdAt)},
                {Updated: getFormatedDate(data.data.updatedAt)},
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

                    <div className="metadata d-flex wrap-flex justify-center row-gap-05 col-gap-3 mb-1">
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