import { Divider, Fab, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginUser, setLoginUser] = useState({
        uname: "",
        pwd: ""
    });
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const newUser = { ...loginUser };
        newUser[e.target.name] = e.target.value;
        if (e.target.name === "uname") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            e.target.value.match(emailRegex) ? setUserNameError('') : setUserNameError('invalid email id')
        } else if (e.target.name === "pwd") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~`\\[\];',./-])[A-Za-z\d!@#$%^&*()_+{}|:"<>?~`\\[\];',./-]{8,}$/;
            e.target.value.match(passwordRegex) ? setPasswordError('') : setPasswordError('Invalid Password')
        }
        setLoginUser(newUser);
    }

    const handleLogin = () => {
        console.log(loginUser);
    }
    return (
        <div className='mainContainer'>
            <div className="mainContainer-login-form">
                <div className="login-form-welcome-message">
                    <Typography variant='h4'>
                        Welcome to the Login Page
                    </Typography>
                </div>
                <div className="login-form">
                    <FormControl>
                        <TextField className='textField' label="UserName" type='email' variant="outlined" placeholder='abc@gmail.com' value={loginUser.uname} name='uname' onChange={handleChange} error={userNameError !== ''} helperText={userNameError} />
                        <TextField className='textField' label="Password" type='password' variant="outlined" placeholder='Abc@123' value={loginUser.pwd} name='pwd' onChange={handleChange} error={passwordError !== ''} helperText={passwordError} />

                        <Fab variant="extended" style={{ background: '#1976d2' }} onClick={handleLogin}>
                            <NavigationIcon sx={{ mr: 1, color: 'white' }} />
                            <Link className='link link-button'>Login</Link>
                        </Fab>
                    </FormControl>
                </div>
                <div className="legalTextRow">
                    <Typography variant='body1'>
                        By continuing, you agree to application <br />
                        <Link className='link' to={''}>Conditions of Use</Link> and <Link className='link' to={''}>Privacy Notice</Link>.
                    </Typography>
                </div>
            </div>
            <div className="divider-break">
                <Divider style={{ flexGrow: 1, margin: '0 10px' }} />
                <Typography variant='subtitle1' style={{ color: 'gray' }}>New to the Application ?</Typography>
                <Divider style={{ flexGrow: 1, margin: '0 10px' }} />
            </div>
            <div className="create-account">
                <Fab variant="extended" style={{ background: '#1976d2' }} onClick={handleLogin}>
                    <NavigationIcon sx={{ mr: 1, color: 'white' }} />
                    <Link className='link link-button' to={'/'}>Create your ***** Account</Link>
                </Fab>
            </div>
            <div className="footer-section">
                <div className="legal-links">
                    <Link className='link'>Condition of Use</Link>
                    <Link className='link'>Privacy Notice</Link>
                    <Link className='link'>Help</Link>
                </div>
                <div className='footer-details'>
                    <Typography variant='body2' style={{ color: 'gray' }}>© 1996-2024, *******.com, Inc. or its affiliates</Typography>
                </div>
            </div>
        </div>
    )
}

export default Login
