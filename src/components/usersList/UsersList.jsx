import { useEffect, useImperativeHandle, useMemo } from "react";
import { useFetch, useUpdate } from "../../customhooks/httpMethod";
import ReactSwitch from "react-switch";
import { forwardRef } from "react";
import Spinner from "../../modals/Loading/Spinner";
function UsersList({users,setUsers},ref){

    const { data, error, isPending } = useFetch('getUsers');

    const { update } = useUpdate('approve');

    let selectedUsers = useMemo(() => [],[]);

    useEffect(() => {
        if(data?.users){
            setUsers(data.users);
        }
    },[data,setUsers]);

    const handleSwitch = ({id}) => {
        update({id},() => {
            setUsers(users.map(Obj => Obj._id === id ? {...Obj,approved: !Obj.approved} : Obj));
        },false);
    }

    const handleSelect = (e,userId) => {
        e.target.checked ? selectedUsers.push(userId) : selectedUsers.splice(selectedUsers.indexOf(userId),1);
    }

    useImperativeHandle(ref,() => ({
        getSelectedUsers: () => selectedUsers
    }),[selectedUsers]);

    if(isPending || error?.message) return <p className="mt-1 fs-4 font-weight-600 uppercase text-secondary">{isPending ? <Spinner/> : error.message + "!"}</p>

    return(
        <div className="overflow-x-auto">
            <table style={{borderCollapse:'collapse',minWidth:"750px"}} className="bg-tile-blue w-100 mtb-1 rounded-05 hide-overflow shadow-primary">
                <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th className="fs-4 text-start font-weight-500 ptb-05 plr-05">Name</th>
                        <th className="fs-4 text-start font-weight-500 ptb-05 plr-05">Email</th>
                        <th className="fs-4 text-start font-weight-500 ptb-05 plr-05">Role</th>
                        <th className="fs-4 text-start font-weight-500 ptb-05 plr-05">Access</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user._id}>
                                <td className="text-centered">
                                    <input onChange={(e) => handleSelect(e,user._id)} type="checkbox"/>
                                </td>
                                <td className="fs-4 p-05">{user.name}</td>
                                <td className="fs-4 p-05">
                                    <a className="font-weight-400 text-white" href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td className="fs-4 p-05">{user.role}</td>
                                <td className="fs-4 p-05">
                                    <ReactSwitch 
                                        onChange={() => handleSwitch({id:user._id})}
                                        checked={user.approved}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        height={15}
                                        width={40}
                                        handleDiameter={24}
                                        onColor="#72E2AE"
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default forwardRef(UsersList);