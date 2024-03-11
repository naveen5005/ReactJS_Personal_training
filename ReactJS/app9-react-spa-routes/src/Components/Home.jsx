import React from 'react'
import { useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState({
    fname: "",
    gender: "",
    areasOfInterest: [],
    state: ""
  })

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
  const addUser = () => {
    console.log(user)
    Axios.post("http://localhost:3001/users/", user);
    clearForm();
  }
  const clearForm = () =>{
    setUser({
      fname:"",
      gender:"",
      areasOfInterest :[],
      state : ""
    })
  }
  return (
    <div>
      <h2>Welcome to user Details</h2>
      <form action="">
        <label htmlFor="">FullName : </label>
        <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />
        <label htmlFor="">Gender : </label>
        <input type="radio" name="gender" value={"male"} onChange={handleChange} checked={user.gender === "male"} /> Male
        <input type="radio" name="gender" value={"female"} onChange={handleChange} checked={user.gender === "female"} /> Female
        <input type="radio" name="gender" value={"other"} onChange={handleChange} checked={user.gender === "other"} /> Other <br />
        <label htmlFor="">Areas Of Interest : </label>
        <input type="checkbox" name="areasOfInterest" value={"HTML"} onChange={handleChange} checked={user.areasOfInterest.includes("HTML")} /> HTML
        <input type="checkbox" name="areasOfInterest" value={"CSS"} onChange={handleChange} checked={user.areasOfInterest.includes("CSS")} /> CSS
        <input type="checkbox" name="areasOfInterest" value={"JS"} onChange={handleChange} checked={user.areasOfInterest.includes("JS")} /> JS
        <input type="checkbox" name="areasOfInterest" value={"REACTJS"} onChange={handleChange} checked={user.areasOfInterest.includes("REACTJS")} /> REACTJS <br />
        <label htmlFor="">State : </label>
        <select name="state" value={user.state} onChange={handleChange}>
          <option value=""></option>
          <option value="AP">AP</option>
          <option value="TS">TS</option>
        </select> <br /> <br />
        <button type="button" onClick={addUser}>
          <Link to={'/users'}>Add Details</Link>
        </button>
      </form>
    </div>
  )
}

export default Home
