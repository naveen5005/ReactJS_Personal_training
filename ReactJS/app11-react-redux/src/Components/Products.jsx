import React from 'react'
import { useSelector } from 'react-redux'

const Products = () => {

    const data =useSelector((state)=>{
        return state.products
    })
  return (
    <div>
      <hr />
      <h2>Welcome to Products Functional component</h2>
      <ul>
        {
            data.map((prod,i)=>{
                return(
                    <li key={i}>{prod}</li>
                )
            })
        }
      </ul>
    </div>
  )
}

export default Products
