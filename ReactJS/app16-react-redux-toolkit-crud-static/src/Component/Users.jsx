import React, { useState } from 'react'
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from '../Store/userSlice';
const Users = () => {
    const [user, setUser] = useState({
        id: "",
        fname: "",
        lname: ""
    });

    const[index,setIndex] = useState(null);
    
    const users = useSelector((state) => {
        return state.StoreDetails.users;
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const newUser = { ...user };
        if(newUser.id === ""){
            newUser.id = Math.round(Math.random()*100);
        }
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const handleAddUser = () => {
        console.log(user)
        dispatch(addUser(user));
        clearForm();
    }
    const handleDeleteUser = (user,i) =>{
        dispatch(deleteUser(user));
    }
    const  handleEditUser = (user,i) => {
        setUser(user);
        setIndex(i);
    }
    const handleUpdateUser = () =>{
        dispatch(updateUser(user));
        clearForm();
        setIndex(null);
    }
    const clearForm = () => {
        setUser({
            fname : "",
            lname : ""
        })
    }
    return (
        <div>
            <div className="form">
                <form action="">
                    <label htmlFor="">FirstName : </label>
                    <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />
                    <label htmlFor="">LastName : </label>
                    <input type="text" name="lname" value={user.lname} onChange={handleChange} /> <br />
                    {
                        index === null ?<button type="button" onClick={handleAddUser}>Add User</button> :
                        <button type="button" onClick={handleUpdateUser}>Update User</button>
                    }
                </form>
            </div>
            <div className="tableData">
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usr, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{usr.id}</td>
                                        <td>{usr.fname}</td>
                                        <td>{usr.lname}</td>
                                        <td>
                                            <button type="button" onClick={()=>handleEditUser(usr,i)}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={()=>handleDeleteUser(usr,i)}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
