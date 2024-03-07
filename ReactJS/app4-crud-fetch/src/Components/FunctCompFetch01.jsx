import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const FunctCompFetch01 = () => {
    const [user, setUser] = useState({
        fname: "",
        gender: "",
        areasOfInterest: [],
        state: ""
    })
    const [users, setUsers] = useState([]);
    const [updateIndex, setUpdateIndex] = useState(null);

    const commonServerCommunication = async (method, payload) => {
        var url;
        method === "GET" || method === "POST" ? url = "http://localhost:3001/users" : url = "http://localhost:3001/users/" + payload.id
        var results = await (await fetch(url, {
            method: method,
            headers: { 'Content-type': 'application/json' },
            body: method === "PUT" || method === "POST" ? JSON.stringify(payload) : null
        })).json();
        if (method === "GET") {
            setUsers(results);
        }
    }
    const getDataFromServer = () => {
        commonServerCommunication("GET");
    }

    useState(() => {
        getDataFromServer()
    }, [])

    const handleChange = (e) => {
        const newUser = { ...user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newUser.areasOfInterest.push(e.target.value);
            } else {
                const index = newUser.areasOfInterest.indexOf(e.target.value);
                console.log(index)
                if (index !== -1) {
                    newUser.areasOfInterest.splice(index, 1);
                }
            }
        }
        else {
            newUser[e.target.name] = e.target.value;
        }
        setUser(newUser);
    }
    const addUser = () => {
        const newUser = { ...user };
        commonServerCommunication("POST", newUser);
        getDataFromServer();
        clearForm();
    }
    const clearForm = () => {
        setUser({
            fname: "",
            gender: "",
            areasOfInterest: [],
            state: ""
        })
    }
    const deleteUser = (usr,i) => {
        commonServerCommunication("DELETE",usr);
        getDataFromServer();
    }
    const editUser = (usr,i) => {
        setUser(usr);
        setUpdateIndex(usr.id);
    }
    const updateUser = () => {
        const newPerson = {...user};
        commonServerCommunication("PUT",newPerson);
        clearForm();
        setUpdateIndex(null);
        getDataFromServer();
    }
    return (
        <div>
            <div>
                <form action="">
                    <label htmlFor="">fullName : </label>
                    <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />

                    <label htmlFor="">Gender : </label>
                    <input type="radio" name="gender" onChange={handleChange} checked={user.gender === "male"} value="male" /> Male
                    <input type="radio" name="gender" onChange={handleChange} checked={user.gender === "female"} value="female" /> Female
                    <input type="radio" name="gender" onChange={handleChange} checked={user.gender === "other"} value="other" /> Other <br />

                    <label htmlFor="">Areas Of Interest : </label>
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("HTML")} value="HTML" /> HTML
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("CSS")} value="CSS" /> CSS
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("JS")} value="JS" /> JS
                    <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("REACTJS")} value="REACTJS" /> REACTJS <br />

                    <label htmlFor="">State :</label>
                    <select name="state" value={user.state} onChange={handleChange}>
                        <option value=""></option>
                        <option value="AP">AP</option>
                        <option value="TS">TS</option>
                    </select> <br />
                    {
                        updateIndex === null ? <button type="button" onClick={addUser}>Add User</button>
                        : <button type="button" onClick={updateUser}>Update User</button>
                    }

                </form>
            </div> <br /><br />
            <div>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>fullName</th>
                            <th>gender</th>
                            <th>areas Of Interest</th>
                            <th>state</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usr, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{usr.fname}</td>
                                        <td>{usr.gender}</td>
                                        <td>{usr.areasOfInterest.join(",")}</td>
                                        <td>{usr.state}</td>
                                        <td>
                                            <button type="button" onClick={()=>{editUser(usr,i)}}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={()=>{deleteUser(usr,i)}}>delete</button>
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

export default FunctCompFetch01
