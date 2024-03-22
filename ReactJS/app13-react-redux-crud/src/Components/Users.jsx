import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleAddUserAction, handleDeleteUserAction, handleUpdateUserAction } from '../Store/action';
const Users = () => {
    const [user, setUser] = useState({
        fname: "",
        pwd: "",
        gender: "",
        areasOfInterest: [],
        learning: ""
    });
    const [index,setIndex] = useState(null);

    const storeUsers = useSelector((state) => {
        return state.users;
    })
    console.log(storeUsers);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const newUser = { ...user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newUser.areasOfInterest.push(e.target.value);
            } else {
                const index = newUser.areasOfInterest.indexOf(e.target.value);
                newUser.areasOfInterest.splice(index, 1);
            }
        } else {
            newUser[e.target.name] = e.target.value;
        }
        setUser(newUser);
    }
    const handleAddUser = () => {
        dispatch(handleAddUserAction(user));
        clearForm();
    }

    const handleEdit = (usr,i) =>{
        setUser(usr);
        setIndex(i);
    } 
    const handleUpdateUser = () =>{
        dispatch(handleUpdateUserAction({...user,index}));
        setIndex(null);
        clearForm();
    }
    const handleDelete = (usr,index) =>{
        console.log(usr,index)
        dispatch(handleDeleteUserAction({...usr,index}))
    }
    const clearForm = () => {
        setUser({
            fname: "",
            pwd: "",
            gender: "",
            areasOfInterest: [],
            learning: ""
        })
    }
    return (
        <div>
            <div>
                <form action="">
                    <label htmlFor="">Full Name : </label>
                    <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />

                    <label htmlFor="">Password : </label>
                    <input type="password" name="pwd" value={user.pwd} onChange={handleChange} /> <br />

                    <label htmlFor="">Gender : </label>
                    <select name="gender" value={user.gender} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select> <br />

                    <label htmlFor="">Areas of Interest :</label> <br />
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} value={"HTML"} checked={user.areasOfInterest.includes("HTML")} /> HTML <br />
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} value={"CSS"} checked={user.areasOfInterest.includes("CSS")} /> CSS<br />
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} value={"JS"} checked={user.areasOfInterest.includes("JS")} /> JS<br />
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} value={"REACTJS"} checked={user.areasOfInterest.includes("REACTJS")} /> REACTJS <br />
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} value={"BOOTSTRAP"} checked={user.areasOfInterest.includes("BOOTSTRAP")} /> BOOTSTRAP <br />

                    <label htmlFor="">Interest in Learning : </label>
                    <input type="radio" name="learning" onChange={handleChange} value={"yes"} checked={user.learning === "yes"} /> yes
                    <input type="radio" name="learning" onChange={handleChange} value={"no"} checked={user.learning === "no"} /> no
                    <input type="radio" name="learning" onChange={handleChange} value={"none of the above"} checked={user.learning === "none of the above"} /> none of the above <br />

                    {
                        index === null ? <button type="button" onClick={handleAddUser}>Add User</button> :
                        <button type="button" onClick={handleUpdateUser}>update User</button>
                    }
                </form>
            </div> <br /><br />
            <div>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>FullName</th>
                            <th>Password</th>
                            <th>Gender</th>
                            <th>Areas Of Interest</th>
                            <th>is Learning ?</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storeUsers.map((usr,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{usr.fname}</td>
                                        <td>{usr.pwd}</td>
                                        <td>{usr.gender}</td>
                                        <td>{usr.areasOfInterest}</td>
                                        <td>{usr.learning}</td>
                                        <td>
                                            <button type="button" onClick={()=>handleEdit(usr,i)}>Edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={()=>handleDelete(usr,i)}>Delete</button>
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
