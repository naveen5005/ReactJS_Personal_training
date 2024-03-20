import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { handleAddUserAction } from '../Store/actions';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

const User = () => {
    const [user, setUser] = useState({
        id:"",
        uname: "",
        pwd: ""
    });
    const [allUsers, setAllUsers] = useState([]);

    const { users } = useSelector((state) => {
        return state;
    })

    // useEffect(()=>{
    //     setAllUsers(users);
    // },[])

    const handleChange = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        newUser["id"] = Math.random().toString(36).substring(2,);
        setUser(newUser)
    }
    const dispatch = useDispatch();

    const columns = [
        { field: 'uname', headerName: 'User name', width: 130 },
        { field: 'pwd', headerName: 'password', width: 130 },
    ];
    return (
        <div style={{ marginTop: '100px' }}>
            <FormControl>
                <TextField id="outlined-basic" label="UserName" type='text' variant="outlined" name='uname' value={user.uname} onChange={handleChange} /> <br />
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined" name='pwd' value={user.pwd} onChange={handleChange} /> <br />
                <Button variant="contained" onClick={() => dispatch(handleAddUserAction(user))}>Add User</Button>
            </FormControl> <br /><br />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    key={Math.round(Math.random().toString(36).substring(2,))}
                />
            </div>
        </div>
    )
}

export default User
