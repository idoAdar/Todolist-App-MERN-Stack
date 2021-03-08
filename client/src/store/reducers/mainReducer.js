import * as actionTypes from '../actionTypes';

const initState = {
    list: [],
    isLoading: true
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL:
            return {
                ...state,
                list: [...action.data],
                isLoading: false
            }
        case actionTypes.CREATE_TODO:
            return {
                ...state,
                list: [action.data, ...state.list]
            }
        case actionTypes.UPDATE_TODO:
            const updatedTodo = action.data;
            const filterdArray = state.list.filter(todo => todo._id !== updatedTodo._id);
            const updateList = [updatedTodo, ...filterdArray];
            return {
                ...state,
                list: updateList
            }
        case actionTypes.RESET_MAIN:
            return {
                list: [],
                isLoading: true
            }
        default: return state;
    }
}

export default reducer;