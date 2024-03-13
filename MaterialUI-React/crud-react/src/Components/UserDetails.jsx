import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Axios from 'axios';

const UserDetails = () => {

    const [persons, setPersons] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'fname',
            headerName: 'Full name',
            width: 200,
            // editable: true,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
            // editable: true,
        },
        {
            field: 'areasOfInterest',
            headerName: 'Areas Of Interest',
            width: 200,
        },
        {
            field: 'favNames',
            headerName: 'Favourate Persons',
            width: 300
        },{

        }
    ];

    useEffect(() => {
        getDataFromServer();
    }, []);
    const getDataFromServer = async () => {
        await Axios.get("http://localhost:3001/users").then((res) => {
            setPersons(res.data);
        })
    }
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={persons}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                key={persons.id}
            />
        </Box>
    )
}

export default UserDetails
