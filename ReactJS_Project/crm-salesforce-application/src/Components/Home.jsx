import React, { useEffect, useState } from 'react'
import { handleGetAllProductsAsync } from '../Store/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../Styles/Home.css';
import ProducItem from './ProducItem';

const Home = () => {
    const [products,setProducts] = useState([]);

    const allProducts = useSelector((state)=>{
        return state.students.products;
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(handleGetAllProductsAsync())
    },[])
  return (
    <div className='body'>
        <div className="bodyItems">
            {
                allProducts.map((item,index)=>{
                    return(
                        <ProducItem key={index} item={item}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home
