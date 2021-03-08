import axios from 'axios';
import setAuthToken from '../../utills/setAuthToken';
import * as actionTypes from '../actionTypes';

export const getAll = () => async dispatch => {
    setAuthToken(localStorage.token);
    try {
        const response = await axios.get('/api/todos/getAll');
        dispatch({
            type: actionTypes.GET_ALL,
            data: response.data
        })        
    } catch (error) {
        console.dir(error)
    }
}

export const newTodo = formData => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        title: formData.title,
        text: formData.text
    })

    try {
        const response = await axios.post('/api/todos/create_todo', body, config);
        dispatch({
            type: actionTypes.CREATE_TODO,
            data: response.data
        })
    } catch (error) {
        console.dir(error);
    }
}

export const removeTodo = (userId, todoId) => async dispatch => {
    try {
        const response = await axios.delete(`/api/todos/remove/${userId}/${todoId}`);
        dispatch({
            type: actionTypes.GET_ALL,
            data: response.data
        })
    } catch (error) {
        console.dir(error)
    }
}

export const saveTodo = (formData ,userId, todoId, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({
        title: formData.title,
        text: formData.text
    })
    
    try {
        const response = await axios.put(`/api/todos/edit/${userId}/${todoId}`, body, config);
        dispatch({
            type: actionTypes.UPDATE_TODO,
            data: response.data
        })
        history.push('/dashboard');
    } catch (error) {
        console.dir(error);
    }
}

export const resetApp = () => dispatch => {
    dispatch({
        type: actionTypes.RESET_AUTH
    })
    dispatch({
        type: actionTypes.RESET_MAIN
    })
}