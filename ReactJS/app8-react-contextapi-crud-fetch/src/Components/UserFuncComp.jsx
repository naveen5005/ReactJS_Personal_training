import React, { useEffect, useState } from 'react'
import { Context } from './Context'

const UserFuncComp = () => {
    const [user, setUser] = useState({
        fname: ""
    });
    const [users, setUsers] = useState([]);
    const[index,setIndex] = useState(null);

    const handleChange = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const addUser = (commonServerCommunication) => {
        commonServerCommunication("POST", user);
        clearForm();
        getDataFromServer();
    }
    const deleteUser = (commonServerCommunication,usr) =>{
        commonServerCommunication("DELETE",usr);
        getDataFromServer();
    }
    const editUser = (usr) =>{
        setUser(usr);
        setIndex(usr.id);
    }
    const updateUser = (commonServerCommunication) =>{
        commonServerCommunication("PUT",user);
        clearForm();
        setIndex(null);
        getDataFromServer();
    }
    const clearForm = () => {
        setUser({
            fname: ""
        })
    }
    const getDataFromServer = async () => {
        var results = await (await fetch("http://localhost:3001/users", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null
        })).json();
        setUsers(results);
    }
    useEffect(() => {
        getDataFromServer();
    }, []);
    return (
        <div>
            <h2>Welcome</h2>
            {
                <Context.Consumer>
                    {
                        ({ commonServerCommunication }) => {
                            return (
                                <div>
                                    <div>
                                        <form action="">
                                            <label htmlFor="">FullName :</label>
                                            <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />
                                            {
                                                index === null ? <button type="button" onClick={() => addUser(commonServerCommunication)}>Add User</button>
                                                : <button type="button" onClick={() => updateUser(commonServerCommunication)}>Update User</button>
                                            }
                                        </form>
                                    </div><br />
                                    <div>
                                        <table border={2}>
                                            <thead>
                                                <tr>
                                                    <th>FullName</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((usr, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{usr.fname}</td>
                                                                <td>
                                                                    <button type="button" onClick={()=>editUser(usr)}>edit</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" onClick={()=>deleteUser(commonServerCommunication,usr)}>delete</button>
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
                    }
                </Context.Consumer>
            }
        </div>
    )
}

export default UserFuncComp
