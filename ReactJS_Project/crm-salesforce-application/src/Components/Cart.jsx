import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { decrementQuantity, incrementQuantity } from '../Store/cartSlice';


const Cart = () => {
    const cart = useSelector((state) => {
        return state.cart.cart;
    });
    const dispatch = useDispatch();

    const handleIncrement = (params) => {
        dispatch(incrementQuantity(params.row));
    }
    const handleDecrement = (params) =>{
        dispatch(decrementQuantity(params.row));
    }
const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
    },
    {
        field: 'image',
        headerName: 'Image',
        width: 200,
        renderCell: (params) => (
            <img src={params.value} alt="Product" style={{ width: '100%', height: '100px' }} />
        ),
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 100,
        renderCell : (params) =>{
            <div>{params.value * params.row.quantity}</div>
            // console.log(params , " : ", params.value * params.row.quantity)
        }
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 200,
        renderCell: (params) => (
            <div style={{display : 'flex'}}>
                <Button variant='contained' onClick={()=>handleDecrement(params)}>-</Button>
                <div style={{ marginLeft: 8, marginRight: 8 }}>
                    <b>{params.value}</b>
                </div>
                <Button variant='contained' onClick={()=>handleIncrement(params)}>+</Button>
            </div>
        )
    }
    // ,
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];

    console.log(cart);
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={cart}
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
                disableRowSelectionOnClick
            />
        </Box>
    )
}

export default Cart
