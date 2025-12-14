import "./loading.css";
import ReactDOM from 'react-dom';
import Spinner from "./Spinner";
import { useLoading } from "../../store/zustandStore";
function Loading(){
    const loading = useLoading(state => state.loading);
    if(loading){
        return ReactDOM.createPortal(
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-overlay d-flex center-y justify-center z-index-110">
                <Spinner/>
            </div>
            ,document.getElementById('flash')
        );
    }
}

export default Loading;