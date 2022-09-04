import {createReducer,createAction} from "@reduxjs/toolkit"

const initialState = {
    error: false,
    token: '',
    authorised: false,
    loginError: false
}

export const setError = createAction('SET_ERROR')
export const setAuthorised = createAction('SET_AUTHORISED')
export const setToken = createAction('SET_TOKEN')
export const setLoginError = createAction('SET_LOGIN_ERROR')

export const authorisationReducer = createReducer(initialState, {
    [setError]: (state, action) => {
        state.error = action.payload
    },

    [setLoginError]: (state, action) => {
        state.loginError = action.payload
    },

    [setAuthorised]: (state, action) => {
        state.authorised = action.payload
    },

    [setToken]: (state, action) => {
        state.token = action.payload
    }

})
