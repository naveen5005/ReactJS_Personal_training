import React, { useState } from 'react'
import '../Styles/classCRUD01.css'


const FuncCRUD01 = () => {
    const [user, setUser] = useState({
        fname: "",
        lname: ""
    });
    const [users, setUsers] = useState([
        {
            fname: "naveen",
            lname: "kumar"
        },
        {
            fname: "Kiran",
            lname: "Kumar"
        }
    ])
    const [editIndex, setEditIndex] = useState(null);
    const newUsers = [...users];
    const newUser = { ...user };

    const handleChange = (e) => {
        // const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const addUser = () => {
        newUsers.push(user);
        setUsers(newUsers);
        clearForm();
    }
    const clearForm = () => {
        setUser({
            fname: "",
            lname: ""
        })
    }
    const deleteUser = (user, i) => {
        // const newUsers = [...users];
        newUsers.splice(i, 1);
        setUsers(newUsers);
    }
    const editUser = (user, i) => {
        setUser(user);
        setEditIndex(i);
    }
    const updateUser = () =>{
        // const newUsers = [...users];
        newUsers[editIndex] = user;
        setUsers(newUsers);
        setEditIndex(null);
        clearForm();
    }
    return (
        <div className='mainContainer'>
            <div className="formDisplay">
                <label htmlFor="">FirstName : </label>
                <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />
                <label htmlFor="">LastName : </label>
                <input type="text" name="lname" value={user.lname} onChange={handleChange} /> <br />
                {editIndex === null ? <button type="button" className='addUpdateStyle' onClick={addUser}>Add User</button>
                    : <button type="button" className='addUpdateStyle' onClick={updateUser}>Update User</button>
                }
            </div>
            <div className="tableDisplay">
                <table>
                    <thead>
                        <tr>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.fname}</td>
                                        <td>{user.lname}</td>
                                        <td>
                                            <button type="button" onClick={() => editUser(user, i)}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => deleteUser(user, i)}>delete</button>
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

export default FuncCRUD01
