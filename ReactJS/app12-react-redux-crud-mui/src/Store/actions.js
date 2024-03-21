
export const handleAddUserAction = (user) => {
    return {
        type: "ADD_USERS",
        payload: user
    }
}

export const handleDeleteUserAction = (userID) => {
    return {
        type: "DELETE_USERS",
        payload: userID
    }
}

export const handleUpdateUserAction = (user) => {
    console.log(user);
    return {
        type: "UPDATE_USERS",
        payload: user,
    }
}
export const handleAddProductAction = (product) => {
    return {
        type: "ADD_PRODUCTS",
        payload: product
    }
}

export const handleDeleteProductAction = (productID) => {
    console.log(productID);
    return {
        type: "DELETE_PRODUCTS",
        payload: productID
    }
}

export const handleUpdateProductAction = (product) => {
    console.log(product)
    return{
        type : "UPDATE_PRODUCTS",
        payload: product
    }
}