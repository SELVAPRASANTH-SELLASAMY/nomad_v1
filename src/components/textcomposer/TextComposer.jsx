import { useSearchParams } from "react-router-dom";
import './textcomposer.css';
import { useFetch } from "../../customhooks/httpMethod";
function TextComposer(){
    const [queryParams] = useSearchParams();
    const Id = queryParams.get("id");
    const { data, error, isPending } = useFetch(`blog/getcontent?id=${Id}`);
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
                    <div dangerouslySetInnerHTML={{__html:data?.data.content}}></div>
                </>
            }
        </section>
    );
}
export default TextComposer;