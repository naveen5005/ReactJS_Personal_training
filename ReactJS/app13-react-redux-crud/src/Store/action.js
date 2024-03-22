
export const handleAddUserAction = (user) =>{
    return{
        type: "ADD_USERS",
        payload : user
    }
}
export const handleDeleteUserAction = (user) => {
    return{
        type: "DELETE_USERS",
        payload : user
    }
}
export const handleUpdateUserAction = (user) =>{
    return{
        type: "UPDATE_USERS",
        payload: user
    }
}

export const handleAddProductAction = (product) => {
    return{
        type : "ADD_PRODUCTS",
        payload : product
    }
}
export const handleDeleteProductAction = (product) => {
    return{
        type : "DELETE_PRODUCTS",
        payload : product
    }
}

export const handleUpdateProductAction = (product) => {
    return {
        type: "UPDATE_PRODUCTS",
        payload : product
    }
}