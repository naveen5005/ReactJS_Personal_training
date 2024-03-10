import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Axios from 'axios'
import { Link, Outlet } from 'react-router-dom';
const Users = () => {
    const[users,setUsers] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/users").then((response)=>{
            setUsers(response.data)
        })
    },[])
  return (
    <div className='usersComp'>
      <h2>Welcome to Users Functional Component</h2>
      <ul>
        {
            users.map((usr,i)=>{
                return(
                    <li key={i}>
                        <Link to={`${usr.id}`}>{usr.fname}</Link>
                    </li>
                )
            })
        }
      </ul>
      <Outlet/>
    </div>
  )
}

export default Users
