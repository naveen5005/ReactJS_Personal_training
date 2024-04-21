import React, { useEffect, useState } from 'react'
import '../Styles/Registration.css'
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleCreateStudentRegAsync } from '../Store/studentSlice';

const Registration = () => {
    const [registrationUser, setRegistrationUser] = useState({
        fname: "",
        lname: "",
        email: "",
        pwd: "",
        confirmPwd: "",
        contactNumber: "",
        gender: ""
    })
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [emailError, setEmailError] = useState('');;
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isGenderSelected, setIsGenderSelected] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log(e)
        const newUser = { ...registrationUser };
        newUser[e.target.name] = e.target.value;
        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if the field being updated is 'email' and if it matches the email regex pattern
        const isEmailInvalid = e.target.name === 'email' && !emailRegex.test(e.target.value);
        // Update the email error state based on the check
        setEmailError(isEmailInvalid ? 'Please enter a valid email address' : '');

        // password
        e.target.name === 'confirmPwd' && e.target.value !== registrationUser.pwd ? setPasswordMatchError('Password do not match') : setPasswordMatchError('')

        //gender
        if (e.target.name === 'gender') {
            setIsGenderSelected(true);
        }

        setRegistrationUser(newUser);
    }
    const handleRegisterUser = () => {
        if (!registrationUser.gender) {
            setIsGenderSelected(false);
            setFormSubmitted(true);
            return; // Don't proceed with registration if gender is not selected
        } else {
            console.log(registrationUser);
            dispatch(handleCreateStudentRegAsync(registrationUser))
            setRegistrationSuccess(true);
            clearForm();
        }
    }
    const clearForm = ()=>{
        setRegistrationUser({
            fname: "",
            lname: "",
            email: "",
            pwd: "",
            confirmPwd: "",
            contactNumber: "",
            gender: ""
        })
    }
    useEffect(() => {
        if (registrationSuccess) {
            const timer = setTimeout(() => {
                setRegistrationSuccess(false);
            }, 2000); // 10 seconds
            return () => clearTimeout(timer);
        }
    }, [registrationSuccess]);

    return (
        <div style={{ marginTop: '30px' }}>
            <Typography variant='h4' style={{ textAlign: 'center', paddingBottom: '20px' }}>
                Welcome to the Registration page
            </Typography>
            <div className='registration'>
                {
                    registrationSuccess && <Typography variant='h5' style={{ color: 'green', marginBottom: '20px' }}>Registration Successful!!!</Typography>
                }
                <FormControl>
                    <TextField className='textField' label="FirstName" type='text' variant="outlined" value={registrationUser.fname} name='fname' onChange={handleChange} />
                    <TextField className='textField' label="LastName" type='text' variant="outlined" value={registrationUser.lname} name='lname' onChange={handleChange} />
                    <TextField className='textField' label="Email" type='email' variant='outlined' value={registrationUser.email} name='email' onChange={handleChange}
                        error={emailError !== ''} helperText={emailError} />
                    <TextField className='textField' label="Password" type='password' variant='outlined' value={registrationUser.pwd} name='pwd' onChange={handleChange} />
                    <TextField className='textField' label="Confirm Password" type='password' variant='outlined' value={registrationUser.confirmPwd} name='confirmPwd' onChange={handleChange} error={passwordMatchError !== ''} helperText={passwordMatchError} />
                    <TextField className='textField' label="Contact Number" type='number' variant='outlined' value={registrationUser.contactNumber} name='contactNumber' onChange={handleChange} />

                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" name='gender' onChange={handleChange} checked={registrationUser.gender === "female"} />
                        <FormControlLabel value="male" control={<Radio />} label="Male" name='gender' onChange={handleChange} checked={registrationUser.gender === "male"} />
                        <FormControlLabel value="other" control={<Radio />} label="Other" name='gender' onChange={handleChange} checked={registrationUser.gender === "other"} />
                    </RadioGroup>
                    <FormHelperText error={!isGenderSelected && formSubmitted}>
                        {!isGenderSelected && formSubmitted && 'Gender is required'}
                    </FormHelperText>

                    <Button variant='contained' onClick={handleRegisterUser}>Add User</Button>

                    <div className='SignIn'>
                        Already have an Account? <Link style={{ textDecoration: 'none', color: 'darkblue' }} to={'/login'}>SignIn</Link>
                    </div>


                </FormControl>
            </div>
        </div>
    )
}

export default Registration
