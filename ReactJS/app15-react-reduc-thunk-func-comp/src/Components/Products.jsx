import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { handleCreateProductAsyncFunc, handleDeleteProductAsyncFunc, handleGetProductsAsynFunc, handleUpdateProductAsyncFunc } from '../Store/actions';
import { useEffect } from 'react';
import { useState } from 'react';
const Products = () => {
    const[product,setProduct] = useState({
        prodName : "",
        prodDes : ""
    });
    const[index,setIndex] = useState(null);


    const storeData = useSelector((state)=>{
        return state.products;
    })

    const dispatch = useDispatch();

    const getDataFromAPI = () => {
        dispatch(handleGetProductsAsynFunc())
    }

    useEffect(()=>{
        getDataFromAPI();
    },[])

    const handleChange = (e) => {
        const newProduct = {...product};
        newProduct[e.target.name] = e.target.value;
        setProduct(newProduct);
    }
    const handleAddProduct = () => {
        dispatch(handleCreateProductAsyncFunc(product));
        clearForm();
    }
    const handleDeleteProduct = (prod,i) =>{
        dispatch(handleDeleteProductAsyncFunc(prod));
    }
    const handleEditProduct = (prod,i) =>{
        setProduct(prod);
        setIndex(prod.id);
    }
    const handleUpdateProduct = () => {
        dispatch(handleUpdateProductAsyncFunc(product));
        setIndex(null);
        clearForm();
    }
    const clearForm = () =>{
        setProduct({
            prodName : "",
            prodDes : ""
        })
    }
  return (
    <div>
      <form action="">
        <label htmlFor="">Product : </label>
        <input type="text" name="prodName" value={product.prodName} onChange={handleChange} /> <br />
        <label htmlFor="">Product Description : </label>
        <input type="text" name="prodDes" value={product.prodDes} onChange={handleChange} /> <br />
        {
            index === null ? <button type="button" onClick={handleAddProduct}>Add Product</button> :
            <button type="button" onClick={handleUpdateProduct}>Update Product</button>
        }
      </form>
      <table border={2}>
        <thead>
            <tr>
                <th>Product</th>
                <th>Product Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {
                storeData.map((prod,i)=>{
                    return(
                        <tr key={i}>
                            <td>{prod.prodName}</td>
                            <td>{prod.prodDes}</td>
                            <td>
                                <button type="button" onClick={()=>handleEditProduct(prod,i)}>edit</button>
                            </td>
                            <td>
                                <button type="button" onClick={()=>handleDeleteProduct(prod,i)}>delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Products
