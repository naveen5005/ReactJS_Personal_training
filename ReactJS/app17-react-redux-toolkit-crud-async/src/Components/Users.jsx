import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCreateUserAsync, handleDeleteUserAsync, handleGetUserAsync, handleUpdateUserAsync } from '../Store/userSlice';

const Users = () => {
    const [user,setUser] = useState({
        fname:"",
        lname :""
    });
    const[index,setIndex] = useState(null);

    const users = useSelector((state)=>{
        return state.storeDetails.users;
    })
    const dispatch = useDispatch();

    const getUserDetails = () => {
        dispatch(handleGetUserAsync())
    }
    useEffect(()=>{
        getUserDetails();
    },[]);


    const handleDeleteUser = async (user) => {
        console.log(user)
       await dispatch(handleDeleteUserAsync(user))
       getUserDetails();
    }
    const handleChange = (e) => {
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const handleEditUser = (user) =>{
        setUser(user);
        setIndex(user.id);
    }
    const handleAddUser = async () => {
        await dispatch(handleCreateUserAsync(user));
        clearFormValues();
        getUserDetails();
    }
    const handleUpdateUser = async () => {
        await dispatch(handleUpdateUserAsync(user));
        clearFormValues();
        getUserDetails();
    }
    const clearFormValues = () =>{
        setUser({
            fname : "",
            lname : ""
        })
    }
  return (
    <div>
      <div className="formDisplay">
        <form action="">
            <label htmlFor="">First Name :</label>
            <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />
            <label htmlFor="">Last Name : </label>
            <input type="text" name="lname" value={user.lname} onChange={handleChange} /> <br />
            {
                index === null ? <button type="button" onClick={handleAddUser}>Add User</button>
                : <button type="button" onClick={handleUpdateUser}>Update User</button>
            }
        </form>
      </div>
      <div className="tableDisplay">
        <table border={2}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((usr,i)=>{
                        return(
                            <tr key={i}>
                                <td>{usr.fname}</td>
                                <td>{usr.lname}</td>
                                <td>
                                    <button type="button" onClick={()=>handleEditUser(usr)}>edit</button>
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
