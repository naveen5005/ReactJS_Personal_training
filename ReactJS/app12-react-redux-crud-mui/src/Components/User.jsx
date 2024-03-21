import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { handleAddUserAction, handleDeleteUserAction, handleUpdateUserAction } from '../Store/actions';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const User = () => {
    const [user, setUser] = useState({
        id:"",
        uname: "",
        pwd: ""
    });
    const[index, setIndex] = useState(null);

    const { users } = useSelector((state) => {
        return state;
    })

    function randomNumber(){
        return Math.round(Math.random() * 1000);
    }

    const handleChange = (e) => {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        newUser.id === '' ? newUser.id = randomNumber(): newUser.id = user.id
        setUser(newUser)
    }
    const dispatch = useDispatch();

    const columns = [
        { field: 'uname', headerName: 'User name', width: 130 },
        { field: 'pwd', headerName: 'password', width: 130 },
        { field:'actions', headerName: 'Actions', width: 130, renderCell: (params) => (
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(params.row)} 
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => dispatch(handleDeleteUserAction(params.row.id))} 
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        } 
    ];

    const handleEdit = (row) => {
        setUser(row);
        setIndex(row.id);
    };

    const handleUpdateFun = (user) =>{
        console.log(user)
        dispatch(handleUpdateUserAction(user));
        setIndex(null);
        clearFunction();
    }
    const handleAddFun = (user) => {
        dispatch(handleAddUserAction(user));
        clearFunction();
    }
    const clearFunction = () =>{
        setUser({
            id:"",
            uname: "",
            pwd: ""
        })
    }
    return (
        <div style={{ marginTop: '100px' }}>
            <FormControl>
                <TextField id="outlined-basic" label="UserName" type='text' variant="outlined" name='uname' value={user.uname} onChange={handleChange} /> <br />
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined" name='pwd' value={user.pwd} onChange={handleChange} /> <br />
                {
                    index === null ? <Button variant="contained" onClick={() => handleAddFun(user) }>Add User</Button>
                    : <Button variant="contained" onClick={() => handleUpdateFun(user)}>Update User</Button>
                }
                
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
                    key={users.id}
                />
            </div>
        </div>
    )
}

export default User
