import React, { createContext, useEffect, useState } from 'react';
import { handleGetStudentDetailsAsync } from '../Store/studentSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const Context = createContext();

export const AuthContext = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector((state)=>{
        return state.students;
    });
    const navigate = useNavigate();

    const handleLogin = (user, setUserNameError,setPasswordError) => {
        const { uname, pwd } = user;

        // Check if the username and password are provided
        if (!uname) {
            setUserNameError('Username is required');
            return;
        }
        if (!pwd) {
            setPasswordError('Password is required');
            return;
        }
        const isUserExist = users.some((usr) => usr.email === user.uname && usr.pwd === user.pwd);
        console.log(isUserExist);
        if (isUserExist) {
            setIsLogin(true);
            navigate("/")
        } else {
            setUserNameError('Invalid username');
            setPasswordError('Invalid username');
        }
    };

    const handleLogOut = () => {
        setIsLogin(false);
    };

    useEffect(() => {
        dispatch(handleGetStudentDetailsAsync());
    }, [dispatch]);

    return (
        <div>
            <Context.Provider value={{ isLogin, handleLogin, handleLogOut }}>
                {children}
            </Context.Provider>
        </div>
    );
};

