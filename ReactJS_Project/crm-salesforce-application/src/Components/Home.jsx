import React, { useContext, useEffect, useState } from 'react'
import { handleGetAllProductsAsync } from '../Store/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/Home.css';
import ProducItem from './ProducItem';
import { Context } from '../Authentication/AuthContext';
import Carousel from './Carousel';
import Footer from './Footer';

const Home = () => {
    const [products,setProducts] = useState([]);
    // const [isFilteredData,setIsFilteredData] = useState(false);

    // const {inputSearch} = useContext(Context);

    const allProducts = useSelector((state)=>{
        return state.students.products;
    });
    // const filteredProducts = allProducts.filter((item)=>{
    //     return item.category.includes(inputSearch);
    // });
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(handleGetAllProductsAsync())
    },[])
  return (
    <div className='body'>
        <Carousel/>
        <div className="bodyItems">
            {
                allProducts.map((item,index)=>{
                    return(
                        <ProducItem key={index} item={item}/>
                    )
                }) 
            }
        </div>
        <Footer />
    </div>
  )
}

export default Home
