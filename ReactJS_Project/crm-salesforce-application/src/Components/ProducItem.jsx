import React from 'react'
import '../Styles/ProductItem.css';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Store/cartSlice';


const ProducItem = ({ item }) => {
    // console.log(item);

    const dispatch = useDispatch();
    const cart = useSelector((state) => {
        return state.cart.cart;
    })
    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }
    const handleRemoveFromCart = (item) =>{
        dispatch(removeFromCart(item));
    }
    return (
        <div className='productItem'>
            <div className="topProductItem">
                <div className="leftContainerProductItem">
                    <img src={item.image} style={{ width: 200, height: 200 }} />
                </div>
                <div className="rightContainerProductItem">
                    <h3><u>{item.category}</u></h3>
                    <p><b>Title : </b>{item.title}</p>
                    <p> <b>Price : </b> {item.price}/-</p>
                    <p><b>Rating : </b> {item.rating.rate}</p>
                </div>
            </div>
            <div className="productItemButtons">
                {
                    cart.some((data) => data.id === item.id) ? (
                        <Button variant='contained' onClick={()=> handleRemoveFromCart(item)}>Remove From Cart</Button>
                    )
                    :
                    (
                        <Button variant='contained' onClick={() => handleAddToCart(item)}>Add To Cart</Button>
                    )
                }
                <Button variant='contained'>Buy Now</Button>
            </div>
        </div>
    )
}

export default ProducItem
