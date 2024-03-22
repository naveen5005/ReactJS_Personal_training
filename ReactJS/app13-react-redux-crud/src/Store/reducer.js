
const initialState = {
    users:[],
    products:[],
    carts:[]
}
export const rootReducer = (state = initialState,action) => {
    switch (action.type) {
        case "ADD_USERS":
            return{
                ...state,
                users:[...state.users,action.payload]
            }
        case "DELETE_USERS":
            return{
                users: state.users.filter((usr,i)=> i !== action.payload.index)
            }
        case "UPDATE_USERS":
            return{
                users:state.users.map((usr,i)=> i === action.payload.index && action.payload)
            }
        case "ADD_PRODUCTS":
            return{
                ...state,
                products : [...state.products,action.payload]
            }
        case "DELETE_PRODUCTS":
            return{
                ...state,
                products : state.products.filter((prod,i) => i !== action.payload.index)
            }
        case "UPDATE_PRODUCTS":
            console.log(action)
            return{
                ...state,
                products : state.products.map((prod,i)=> i === action.payload.index && action.payload)
            }
        default:
           return state;
    }
}