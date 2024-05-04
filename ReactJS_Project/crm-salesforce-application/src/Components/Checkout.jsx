import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DiscountIcon from '@mui/icons-material/Discount';
import '../Styles/Checkout.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Store/cartSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => {
        return state.cart.cart;
    });
    const orders =[...cart];
    const totalPrice = cart.reduce((a, b) => {
        if (a.newPrice) {
            return a.newPrice + b.newPrice;
        } else {
            return a + b.newPrice;
        }
    }, 0);
    // const totalPrice = cart.reduce((total, item) => total + (item.newPrice || 0), 0);
    const discountAmount = (10 * totalPrice) / 100;
    const deliveryCharges = 30;
    const totalCharges = Math.ceil(totalPrice) + deliveryCharges - Math.ceil(discountAmount);

    const handlePlaceOrder = () => {
        toast.success('Order placed successfully...!!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        setTimeout(()=>{
            navigate("/order",{
                state:{
                    orders : orders
                }
            });
            dispatch(clearCart());
        },4000)
    }
    return (
        <div className="checkout-container" style={{ margin: '100px' }}>
            {
                cart.length == 0 ?
                    <p style={{ paddingLeft: '45%', paddingTop: '200px' }}>No items available...!!!</p>
                    :
                    <div>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <Card sx={{ width: '500px', margin: 'auto' }}>
                            <div className='cart-LocationContainer'>
                                <div>
                                    <AddLocationIcon />
                                </div>
                                <div>
                                    <Typography variant='h6'>
                                        Select your Location
                                    </Typography>
                                    <Typography variant='body1'>
                                        Please select a location, so we can find you
                                    </Typography>
                                    <Button variant='contained'>Add Location</Button>
                                </div>
                            </div>
                            <div className="cart-discountContainer">
                                <DiscountIcon />
                                <div>
                                    <Typography variant='h6'>
                                        Select / Apply Coupon
                                    </Typography>
                                    <Typography variant='body1'>
                                        Apply Coupons to avail offer on the products
                                    </Typography>
                                </div>
                            </div>
                            <div className="chargesWrapper">
                                <div className="cart-chargesContainer">
                                    <Typography variant='h5'>Total Price</Typography>
                                    <Typography variant='body2'>{Math.ceil(totalPrice)}</Typography>
                                </div>
                                <div className="cart-chargesContainer">
                                    <Typography variant='h5'>Discount</Typography>
                                    <Typography variant='body2'>{Math.ceil(discountAmount)}</Typography>
                                </div>
                                <div className="cart-deliveryChargesContainer">
                                    <Typography variant='h5'>Delivery Charges</Typography>
                                    <Typography variant='body2'>{deliveryCharges}</Typography>
                                </div>
                                <div className="cart-totalCharges">
                                    <Typography variant='h5'>Total Charges</Typography>
                                    <Typography variant='body2' style={{ fontWeight: 'bold' }}>{totalCharges}</Typography>
                                </div>
                                <div className="cart-placeOrder-Container">
                                    <Button variant='contained' className='cart-placeOrder-button' onClick={handlePlaceOrder}>Place Order</Button>
                                </div>
                            </div>
                        </Card>
                    </div>

            }

        </div>
    )
}

export default Checkout
