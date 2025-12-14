import "./loading.css";
function Spinner(){
    return(
        <svg className="spinner" viewBox="0 0 100 100">
            {
                Array.from({length:2},(_,index) => (
                    <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="45" 
                        fill="none" 
                        stroke={index === 1 ? "#72E2AE" : "#72e2ae33"}
                        strokeWidth="10"
                        strokeDasharray={index === 1 ? "286.2" : "0"}
                        strokeDashoffset={index === 1 ? "150" : "0"}
                        strokeLinecap="round"
                    ></circle>
                ))
            }
        </svg>
    )
}
export default Spinner;