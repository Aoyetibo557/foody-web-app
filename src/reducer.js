export const initialState = {
    userEmail: null,
    sessionToken: null,
}


export const actionTypes = {
    SET_USER: 'SET_USER', 
    SET_TOKEN: 'SET_TOKEN',
    REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
};

const reducer = (state, action) => {
    // console.log("From Reducer:", action.userEmail);
    switch(action.type) {
        case actionTypes.SET_USER:
            return{
                ...state,
                userEmail: action.userEmail,
            }

        case actionTypes.SET_TOKEN:
            return {
                ...state,
                sessionToken: action.sessionToken,
            }
            
        default:
            return state;
    }

}

export default reducer;