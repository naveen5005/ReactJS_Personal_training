import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../Store/cartSlice';
import '../Styles/Cart.css'
import Checkout from './Checkout';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => {
        return state.cart.cart;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncrement = (params) => {
        dispatch(incrementQuantity(params.row));
    }
    const handleDecrement = (params) => {
        dispatch(decrementQuantity(params.row));
    }
    const handleCheckout = () =>{
        navigate("/checkout")
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
            field: 'newPrice',
            headerName: 'Price',
            width: 100,

        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className='quantityContainer'>
                    <Button variant='contained' onClick={() => handleDecrement(params)}>-</Button>
                    <div style={{ marginLeft: 8, marginRight: 8 }}>
                        <b>{params.value}</b>
                    </div>
                    <Button variant='contained' onClick={() => handleIncrement(params)}>+</Button>
                </div>
            )
        },
        {
            field: "",
            headerName: "Remove Item",
            width: 200,
            renderCell: (params) => (
                <Button variant='contained' style={{ backgroundColor: 'red' }} onClick={() => dispatch(removeFromCart(params.row))}>Remove Item</Button>
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
        <Box sx={{ height: 400, width: '70%' }} style={{ paddingTop: '50px', display: 'flex', flexGap: '100px',flexDirection:'row-reverse' }}>
            <div className="checkout-button">
                <Button variant='contained' onClick={()=>handleCheckout(cart)}>Checkout</Button>
            </div>
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
