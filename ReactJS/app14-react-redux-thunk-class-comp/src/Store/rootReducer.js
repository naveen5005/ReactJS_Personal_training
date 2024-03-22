const initialState = {
    users :[]
}
export const rootReducer = (state = initialState , action) =>{
    switch (action.type) {
        case "GET_USERS":
            return{
                ...state,
                users : action.payload
            }
    
        default:
            return state;
    }
}