import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DiscountIcon from '@mui/icons-material/Discount';
import '../Styles/Checkout.css';

const Checkout = () => {
    const cart = useSelector((state) => {
        return state.cart.cart;
    });
    const totalPrice = cart.reduce((a, b) => {
        if (a.newPrice) {
            return a.newPrice + b.newPrice;
        } else {
            return a + b.newPrice;
        }
    });
    const discountAmount = (10 * totalPrice) / 100;
    const deliveryCharges = 30;
    const totalCharges = Math.ceil(totalPrice) + deliveryCharges - Math.ceil(discountAmount);
    return (
        <div className="checkout-container" style={{ margin: '100px' }}>
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
                    <Button variant='contained' className='cart-placeOrder-button'>Place Order</Button>
                    </div>
                </div>
                {/* <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        be
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent> */}
                {/* <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions> */}
            </Card>
        </div>
    )
}

export default Checkout
