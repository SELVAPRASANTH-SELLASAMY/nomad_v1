import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { usePost } from '../../customhooks/httpMethod';
import { useUser } from "../../store/zustandStore";
import { useBlogManager } from "../../store/BlogStore";
function UserControls(){
    const navigate = useNavigate();
    const removeUser = useUser(state => state.removeUser);
    const clearBlogs = useBlogManager(state => state.clearBlogs);
    const { post } = usePost('/signout');
    const gotoSettings = () => {
        navigate("/settings");
    }

    const signOut = () => {
        post(null,() => {
            removeUser();
            clearBlogs();
            navigate("/login",{replace: true});
        },true,["Sign Out","Are you sure want to sign out?"]);
    }

    const controls = [
        {icon:<MdOutlineSettings/>,name:"Settings",clickHandler:gotoSettings},
        {icon:<MdOutlineLogout/>,name:"Sign out",clickHandler:signOut}
    ];
    return(
        <ul className='w-10rem border-grey-01 rounded-05 hide-overflow bg-tile-blue absolute right-0 top-25'>
            {
                controls.map((control,index) => (
                    <li key={index} onMouseDown={control.clickHandler} role="button" className='fs-5_5 d-flex center-y gap-05 ptb-05 pl-1 hover-blue pointer'>
                        {control.icon}
                        <span className='fs-4 text-no-wrap'>{control.name}</span>
                    </li>
                ))
            }
        </ul>
    );
}
export default UserControls;