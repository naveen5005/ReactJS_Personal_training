import React, { Component, useEffect, useState } from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

const ViewDetails = () => {
    const[user,setUser] = useState({
        fname: "",
        gender: "",
        areasOfInterest: []
    })
    const params = useParams();
    console.log(params);

    const handlechange = (e) =>{
        const newUser = { ...user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                newUser.areasOfInterest.push(e.target.value);
            } else {
                var index = newUser.areasOfInterest.indexOf(e.target.value);
                newUser.areasOfInterest.splice(index, 1);
            }
        } else {
            newUser[e.target.name] = e.target.value;
        }
        setUser(newUser);
    }
    const updateUser = () =>{
        Axios.put("http://localhost:3001/users/"+params.id,user);   
    }
    useEffect(()=>{
        getDataFromServer();
    },[params.id]);
    const getDataFromServer = () =>{
        Axios.get("http://localhost:3001/users/"+params.id).then((res)=>{
            setUser(res.data)
        })
    }
    return (
        <div>
            <FormControl style={{ marginLeft: '600px' }}> {/* style={{ marginLeft: '40px' }} */}
                <TextField id="standard-basic" label="FullName" variant="standard" name="fname" value={user.fname} onChange={handlechange} InputProps={{readOnly:true}}/> <br />

                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    name="radio-buttons-group"
                    aria-labelledby="demo-radio-buttons-group-label"
                >
                    <FormControlLabel onChange={handlechange} name="gender" checked={user.gender === "male"} value="male" control={<Radio />} label="Male" />
                    <FormControlLabel onChange={handlechange} name="gender" checked={user.gender === "female"} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel onChange={handlechange} name="gender" checked={user.gender === "other"} value="other" control={<Radio />} label="Other" />
                </RadioGroup> <br />

                <FormLabel>Areas of Interest</FormLabel>
                <FormGroup>
                    <FormControlLabel name="areasOfInterest" checked={user.areasOfInterest.includes("HTML")} onChange={handlechange} value={"HTML"} control={<Checkbox />} label="HTML" />
                    <FormControlLabel name="areasOfInterest" checked={user.areasOfInterest.includes("CSS")} onChange={handlechange} value={"CSS"} control={<Checkbox />} label="CSS" />
                    <FormControlLabel name="areasOfInterest" checked={user.areasOfInterest.includes("JS")} onChange={handlechange} value={"JS"} control={<Checkbox />} label="JS" />
                    <FormControlLabel name="areasOfInterest" checked={user.areasOfInterest.includes("REACTJS")} onChange={handlechange} value={"REACTJS"} control={<Checkbox />} label="REACTJS" />
                    <FormControlLabel name="areasOfInterest" checked={user.areasOfInterest.includes("BOOTSTRAP")} onChange={handlechange} value={"BOOTSTRAP"} control={<Checkbox />} label="BOOTSTRAP" />
                </FormGroup>

                <Button variant="contained" onClick={updateUser}><Link to={'/users'} style={{color:"white",textDecoration:"none"}}>Update User</Link></Button> <br />
            </FormControl>
        </div>
    )
}



export default ViewDetails
