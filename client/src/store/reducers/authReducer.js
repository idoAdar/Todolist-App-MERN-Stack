import * as actionTypes from '../actionTypes';

const initState = {
    token: null,
    isAuthentication: false,
    user: null,
    error: null
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
            localStorage.removeItem('token');
            return {
                ...state
            }
        case actionTypes.REGISTER_DENIED:
        case actionTypes.ACCESS_DENIED:
            return {
                ...state,
                error: action.data
            }
        case actionTypes.LOGIN:
            localStorage.setItem('token', action.data.token);
            return {
                ...state,
                token: action.data.token,
                user: action.data.user,
                isAuthentication: true
            }
        case actionTypes.CLEAR:
            return {
                ...state,
                error: null
            }
        case actionTypes.RESET_AUTH:
            localStorage.removeItem('token');
            return {
                token: null,
                isAuthentication: false,
                user: null,
                error: null
            }
        default: return state;
    }
}

export default reducer;