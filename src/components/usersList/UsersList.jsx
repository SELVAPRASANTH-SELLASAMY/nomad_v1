import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useFetch, useUpdate } from "../../customhooks/httpMethod";
import ReactSwitch from "react-switch";
import { forwardRef } from "react";
import Spinner from "../../modals/Loading/Spinner";
function UsersList({users,setUsers},ref){

    const { data, error, isPending } = useFetch('getUsers');

    const { update } = useUpdate('approve');

    const [selectedUsers,setSelectedUsers] = useState([]);

    const allUsers = users.map(user => user._id);

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
        e.target.checked ? setSelectedUsers([...selectedUsers,userId]) : setSelectedUsers(selectedUsers.filter(Id => Id != userId));
    }

    const handleSelectAll = (e) => {
        e.target.checked ? setSelectedUsers(allUsers) : (users.length === selectedUsers.length) ? setSelectedUsers([]) : null;
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
                        <th><input type="checkbox" onChange={handleSelectAll} checked={allUsers.every(Id => selectedUsers.includes(Id))}/></th>
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
                                    <input onChange={(e) => handleSelect(e,user._id)} type="checkbox" checked={selectedUsers.includes(user._id)}/>
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