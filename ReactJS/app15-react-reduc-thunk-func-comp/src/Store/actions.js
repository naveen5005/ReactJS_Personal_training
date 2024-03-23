import axios from "axios";

const handleGetProductData = (dispatch) =>{
    axios.get("http://localhost:3001/products").then(({data})=>{
        dispatch({
            type : "GET_PRODUCTS",
            payload : data
        })
    })
}
export const handleGetProductsAsynFunc = () =>{
    return (dispatch) =>{
        handleGetProductData(dispatch)
    }
}

export const handleCreateProductAsyncFunc = (product) => {
    return(dispatch)=>{
        axios.post("http://localhost:3001/products",product).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}

export const handleDeleteProductAsyncFunc = (product) => {
    return(dispatch)=>{
        axios.delete("http://localhost:3001/products/"+product.id).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}
export const handleUpdateProductAsyncFunc = (product) => {
    return(dispatch)=>{
        axios.put("http://localhost:3001/products/"+product.id , product).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}