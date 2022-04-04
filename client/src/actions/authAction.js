import axios from 'axios';
import config from 'config';
import { returnErrors } from './errorAction';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

//check token and load user

export const loadUser = () => (dispatch, getState) => {
    //user loading 
    dispatch({ type: USER_LOADING });


    axios.post('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};


//register user
export const register = ({ name, email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}
//request body
const body = JSON.stringify({ name, email, password });
axios.post('/api/users', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')),
            dispatch({
                type: REGISTER_FAIL
            });
    });

//loginUser
export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}
//request body
const body1 = JSON.stringify({ email, password });
axios.post('/api/auth', body1, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')),
            dispatch({
                type: LOGIN_FAIL
            });
    });

//logout USer
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// setup config ,headers and token
export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState().auth.token;
    //Header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
