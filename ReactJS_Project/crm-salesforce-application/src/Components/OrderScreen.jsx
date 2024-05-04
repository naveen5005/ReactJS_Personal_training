import { Button, Typography } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Styles/OrderScreen.css';


const OrderScreen = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className='orderContainer'>
      {
        location.state === null ? <p>No orders...!!!</p> :
          <div>
            <h2>Your Orders</h2>
            {
              location.state.orders.map((item) => {
                return (
                  <div className='orderList' key={item.id}>
                    <div>
                      <img src={item.image} alt="productImage" width={'100px'} height={'100px'} />
                    </div>
                    <div className='orderInformation'>
                      <Typography variant='h5'>Category : {item.category}</Typography>
                      <Typography variant='body1'>Title : {item.title}</Typography>
                      <Typography variant='body1'>Price : {item.price}</Typography>
                    </div>
                    <div className='orderButtons'>
                      <Button variant='contained' className='returnProduct button'>Return Product</Button>
                      <Button variant='contained' className='downloadInvoice button'>Download Invoice</Button>
                      <Button variant='contained' className='rateProduct button'>Rate Product</Button>
                    </div>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}

export default OrderScreen
