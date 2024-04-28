import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselComp = () => {
    
    return (
        <div id='carousel-Container'>
            <Carousel autoPlay={true} interval={5000} useKeyboardArrows={true} transitionTime={1000} showStatus={false} showThumbs={false} infiniteLoop={true}>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/CookwareDining/Aman/April/Inverter-batteries---Summer-appliances-hero_1_3000X1200._CB559899992_.jpg" />
                </div>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/CookwareDining/Aman/April/Inverter-batteries---Summer-appliances-hero_1_3000X1200._CB559899992_.jpg" />
                </div>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/nbshagun/realme/70SERIES/29APRIL/GW/SaleTomo/D128157385_DesktopTallHero_3000x1200-copy._CB559851586_.jpg" />
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComp
