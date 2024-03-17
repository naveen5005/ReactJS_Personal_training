import React, { useState, useContext } from 'react'
import { Context } from './AuthContext'

const Login = () => {
  const { isLoggedIn, handleLogin } = useContext(Context);
  const [user, setUser] = useState({
    uname: "",
    pwd: ""
  })

  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  }

  
  return (
    <div>
      <form action="">
        {!isLoggedIn && <p id='error' style={{ color: 'red' }}></p>}

        <label htmlFor="">Username : </label>
        <input type="text" name="uname" value={user.uname} onChange={handleChange} /> <br />
        <label htmlFor="">Password : </label>
        <input type="password" name="pwd" value={user.pwd} onChange={handleChange} /> <br />
        <button type="button" onClick={()=>handleLogin(user, document.getElementById('error'))}>Login</button>
      </form>
    </div>
  )
}

export default Login
