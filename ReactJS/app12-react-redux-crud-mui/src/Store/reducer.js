const initialState = {
    users: [
        {
            id: 1, uname: "naveen", pwd: "123"
        },
        {
            id: 2, uname: "kiran", pwd: "123"
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

        default:
            return state;
    }
}