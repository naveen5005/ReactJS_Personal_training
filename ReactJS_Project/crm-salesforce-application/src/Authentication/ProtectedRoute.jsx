import React, { useContext, useEffect } from 'react'
import { Context } from './AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const { isLogin } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        isLogin ? navigate("/Student") : navigate("/login");
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
