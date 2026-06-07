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

    const getFormatedMetaData = useCallback(() => {
        if(data){
            return[
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

                    <div className="d-grid d-block_L_1024 gap-2 center-y" style={{gridTemplateColumns: "2fr 1fr"}}>
                        <Lazyimage 
                            componentClass={'rounded-top-1'} 
                            placeholder={data?.data?.placeholderThumbnail} 
                            source={data?.data?.thumbnail}
                            altText={`${data?.data?.title} thumbnail`}
                        />

                        <div className="d-flex flex-col gap-1 mt-125_L_1024">
                            <figure className="d-flex gap-1 center-y">
                                <span className="w-5rem h-5rem bg-tile-blue d-iblock rounded-100px border-grey-01 hide-overflow">
                                    {data.data?.owner?.image ? <img src={`${import.meta.env.VITE_REACT_APP_API_URL}/${data.data.owner.image}`} alt="owner's-avatar"/> : null}
                                </span>
                                <figcaption className="fs-6 text-white font-weight-500 uppercase">{data.data?.owner?.name}</figcaption>
                            </figure>

                            <ol id="blog-details" className="bg-tile-blue plr-15 ptb-1 rounded-1 h-fit">
                                {
                                    getFormatedMetaData()?.map((_,index) => (
                                        <li key={index} className="fs-4 line-height-25rem text-no-wrap">
                                            <strong className="d-iblock font-weight-300">{Object.keys(getFormatedMetaData()[index])[0]}</strong>
                                            <span>{Object.values(getFormatedMetaData()[index])[0]}</span>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                    </div>

                    <div className="mt-2" dangerouslySetInnerHTML={{__html:data?.data.content}}></div>
                </>
            }
        </section>
    );
}
export default TextComposer;