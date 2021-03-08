import axios from 'axios';
import * as actionTypes from '../actionTypes';

export const register = (formData, history) => async dispatch => {
    const { name, email, password } = formData;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        name,
        email,
        password
    })
    
    try {
        await axios.post('/api/auth/', body, config);
        dispatch({
            type: actionTypes.REGISTER
        })
        history.push('/login');
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_DENIED,
            data: error.response.data
        })
    }
}

export const login = (formData, history) => async dispatch => {
    const { email, password } = formData;
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        email,
        password
    })
    try {
        const response = await axios.post('/api/auth/login', body, config);
        dispatch({
            type: actionTypes.LOGIN,
            data: response.data
        })
        history.push('/dashboard');
    } catch (error) {
        dispatch({
            type: actionTypes.ACCESS_DENIED,
            data: error.response.data
        })
    }
}

export const clearReduxState = () => dispatch => {
    dispatch({
        type: actionTypes.CLEAR
    })
}