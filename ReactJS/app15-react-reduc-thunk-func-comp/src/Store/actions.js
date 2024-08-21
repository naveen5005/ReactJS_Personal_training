import axios from "../Store/Utils/http";

const handleGetProductData = (dispatch) =>{
    axios.get("/products").then(({data})=>{
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
        axios.post("/products",product).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}

export const handleDeleteProductAsyncFunc = (product) => {
    return(dispatch)=>{
        axios.delete("/products/"+product.id).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}
export const handleUpdateProductAsyncFunc = (product) => {
    return(dispatch)=>{
        axios.put("/products/"+product.id , product).then(()=>{
            handleGetProductData(dispatch);
        })
    }
}