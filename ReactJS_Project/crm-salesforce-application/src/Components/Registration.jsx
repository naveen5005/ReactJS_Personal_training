import React, { useState } from 'react'
import '../Styles/Registration.css'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

const Registration = () => {
    const [registrationUser, setRegistrationUser] = useState({
        fname: "",
        lname: "",
        email: "",
        pwd: "",
        confirmPwd: "",
        gender: ""
    })
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handleChange = (e) => {
        const newUser = { ...registrationUser };
        newUser[e.target.name] = e.target.value;
        e.target.name === 'confirmPwd' && e.target.value !== registrationUser.pwd ? setPasswordMatchError('Password do not match') : setPasswordMatchError('')
        setRegistrationUser(newUser);
    }
    const handleRegisterUser = () => {
        console.log(registrationUser)
    }
    return (
        <div style={{ marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome to the Registration page</h2>
            <div className='registration'>
                <FormControl>
                    <TextField className='textField' label="FirstName" type='text' variant="outlined" value={registrationUser.fname} name='fname' onChange={handleChange} />
                    <TextField className='textField' label="LastName" type='text' variant="outlined" value={registrationUser.lname} name='lname' onChange={handleChange} />
                    <TextField className='textField' label="Email" type='email' variant='outlined' value={registrationUser.email} name='email' onChange={handleChange} />
                    <TextField className='textField' label="Password" type='password' variant='outlined' value={registrationUser.pwd} name='pwd' onChange={handleChange} />
                    <TextField className='textField' label="Confirm Password" type='password' variant='outlined' value={registrationUser.confirmPwd} name='confirmPwd' onChange={handleChange} error={passwordMatchError !== ''} helperText={passwordMatchError} />

                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" name='gender' onChange={handleChange} checked={registrationUser.gender === "female"} />
                        <FormControlLabel value="male" control={<Radio />} label="Male" name='gender' onChange={handleChange} checked={registrationUser.gender === "male"} />
                        <FormControlLabel value="other" control={<Radio />} label="Other" name='gender' onChange={handleChange} checked={registrationUser.gender === "other"} />
                    </RadioGroup>

                    <Button variant='contained' onClick={handleRegisterUser}>Add User</Button>
                </FormControl>
            </div>
        </div>
    )
}

export default Registration
