import { Button } from '@mui/material'
import React from 'react'

const Footer = () => {
    const handleTopNavigation = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

  return (
    <div>
      <Button variant='contained' style={{width:'100%',backgroundColor:'grey',fontWeight:'bold',fontSize:'1rem'}} onClick={handleTopNavigation}>Back to top</Button>
    </div>
  )
}

export default Footer
