import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import Axios from 'axios'
import { Link } from 'react-router-dom'
const UserDetailsForm = () => {
    const [user, SetUser] = useState({
        fname: "",
        gender: "",
        areasOfInterest: [],
        state: ""
    })
    const params = useParams();


    const handleChange = (e) => {
        const newUser = { ...user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newUser.areasOfInterest.push(e.target.value);
            } else {
                var index = newUser.areasOfInterest.indexOf(e.target.value);
                newUser.areasOfInterest.splice(index, 1);
            }
        }
        else {
            newUser[e.target.name] = e.target.value;
        }
        SetUser(newUser)
    }


    useEffect(() => {
        commonServerCommunication("GET", params);
    }, []);

    const commonServerCommunication = async (method, params) => {
        console.log(params)
        let url;
        method === "GET" ? url = "http://localhost:3001/users/" + params.id : url = "http://localhost:3001/users/"+params.id
        var response = await Axios({
            method: method,
            url: url,
            headers: { 'Content-Type': 'application/json' },
        })
        if(method === "get"){
            SetUser(response.data)
        }
    }
    const handleDelete = () =>{
        commonServerCommunication("delete",params);
    }
    return (
        <div>
            <Link to={'/users'}>Return</Link>
            <form action="" style={{ border: '2px solid black', width: '400px', margin: 'auto', padding: '10px' }}>
                <label htmlFor="">FullName : </label>
                <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />

                <label htmlFor="">Gender : </label>
                <input type="radio" checked={user.gender === "male"} name="gender" value={"male"} onChange={handleChange} /> Male
                <input type="radio" checked={user.gender === "female"} name="gender" value={"female"} onChange={handleChange} /> Female
                <input type="radio" checked={user.gender === "other"} name="gender" value={"others"} onChange={handleChange} /> Others <br />

                <label htmlFor="">Areas Of Interest : </label>
                <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("HTML")} value={"HTML"} /> HTML
                <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("CSS")} value={"CSS"} /> CSS
                <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("JS")} value={"JS"} /> JS
                <input type="checkbox" name="areasOfInterest" onChange={handleChange} checked={user.areasOfInterest.includes("REACTJS")} value={"REACTJS"} /> REACTJS <br />

                <label htmlFor="">Gender : </label>
                <select name="state" value={user.state} onChange={handleChange}>
                    <option value=""></option>
                    <option value="AP">AP</option>
                    <option value="TS">TS</option>
                </select> <br />

                <div style={{display:'flex',justifyContent:'space-around',marginTop:'10px'}}>
                    <button type="button" onClick={handleDelete}>
                        <Link to={'/users'}>Delete</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserDetailsForm
