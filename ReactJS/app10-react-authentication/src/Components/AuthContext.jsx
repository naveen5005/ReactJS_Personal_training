import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const Context = createContext();
const AuthContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [allUsers, setAllUsers] = useState([
        // {
        //     uname: "naveen@gmail.com",
        //     pwd: "123"
        // },
        // {
        //     uname: "kiran@gmail.com",
        //     pwd: "123"
        // }
    ])
    const navigate = useNavigate();

    const handleLogin = (user, element) => {
        const isUserExist = allUsers.some((data) => data.uname === user.uname && data.pwd === user.pwd);
        if (isUserExist) {
            setIsLoggedIn(true);
            setLoggedInUser(user.uname);
            navigate("/");
        } else {
            if(user.uname.trim() === "" && user.pwd.trim() === ""){
                element.innerHTML = ("Please enter the username & password");
            }
            else if (user.uname.trim() === "") {
                element.innerHTML = ("Please enter the username");
            } else if (user.pwd.trim() === "") {
                element.innerHTML = ("Please enter the password");
            } else {
                element.innerHTML = "please recheck the username and password...!!!"
            }
        }
    }
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login");
    }
    useEffect(()=>{
        Axios.get("http://localhost:3001/users").then((res)=>{
            setAllUsers(res.data);
        })
    },[])
    return (
        <div>
            <Context.Provider value={{ isLoggedIn, handleLogin, handleLogout, loggedInUser }}>
                {
                    children
                }
            </Context.Provider>
        </div>
    )
}

export default AuthContext
