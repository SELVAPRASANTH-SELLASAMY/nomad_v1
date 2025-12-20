import { useNavControls } from "../../store/zustandStore";
import useWindowWidth from "../../customhooks/useWindowWidth";
function SideBar({activePage,options}){
    const displayNav = useNavControls(state => state.display);
    const handleNavDisplay = useNavControls(state => state.handleDisplay);
    const windowWidth = useWindowWidth();

    const handleClick = () => {
        if(windowWidth <= 768) handleNavDisplay();
    }

    if(((windowWidth > 768) || (windowWidth <= 768 && displayNav))){
        return(
            <div>
                <aside style={{marginTop: windowWidth > 768 ? '9rem' : windowWidth > 500 ? '4rem' : '3.25rem'}} onClick={handleClick} className="w-10rem fixed top-0 h-100 bg-common-blue backdrop-effect_L_768">
                    {
                        options.map((option,index) => (
                            <button key={index} onClick={option.clickEvent} type="button" className={`fs-4 mtb-15 pointer d-flex no-bg ${activePage === option.value ? 'text-primary' : 'text-white'}`}
                            >{option.label}</button>
                        ))
                    }
                </aside>
            </div>
        );
    }
}
export default SideBar;