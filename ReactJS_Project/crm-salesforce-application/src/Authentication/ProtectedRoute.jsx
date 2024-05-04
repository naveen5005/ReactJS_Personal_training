import React, { useContext, useEffect } from 'react'
import { Context } from './AuthContext'
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const { isLogin,setCurrentPath } = useContext(Context);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setCurrentPath(location.pathname)
        isLogin ? navigate(location.pathname) : navigate("/login");
    }, []);
    
    return (
        <div>
            {
                children
            }
        </div>
    )
}

export default ProtectedRoute
