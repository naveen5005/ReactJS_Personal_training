const initialState = {
    users: [
        {
            id: 1, uname: "naveen", pwd: "123"
        },
        {
            id: 2, uname: "kiran", pwd: "123"
        }
    ],
    products: [
        {
            id: 1, prodName: "t-shirt", prodDes: "multi-color"
        },
        {
            id: 2, prodName: "pants", prodDes: "development"
        }
    ]
}
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USERS":
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case "DELETE_USERS":
            const latestUsers = state.users.filter((data) => data.id !== action.payload)
            return {
                users: latestUsers
            }
        case "UPDATE_USERS":
            const updatedUsers = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                return user;
            })
            return {
                users: updatedUsers
            }
        case "ADD_PRODUCTS":
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case "DELETE_PRODUCTS":
            const latestProducts = state.products.filter((data) => data.id !== action.payload)
            return {
                products: latestProducts
            }
        case "UPDATE_PRODUCTS":
            const updatedProducts = state.products.map((prod)=>{
                if(prod.id === action.payload.id){
                    return action.payload
                }
                return prod;
            })
            return{
                products : updatedProducts
            }
        default:
            return state;
    }
}