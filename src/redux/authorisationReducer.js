import {createReducer} from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";

const initialState = {
    error: false,
    token: '',
    authorised: false,
}

export const setError = createAction('SET_ERROR')
export const setAuthorised = createAction('SET_AUTHORISED')
export const setToken = createAction('SET_TOKEN')

export const authorisationReducer = createReducer(initialState, {
    [setError]: (state, action) => {
        state.error = action.payload
    },

    [setAuthorised]: (state, action) => {
        state.authorised = action.payload
    },

    [setToken]: (state, action) => {
        state.token = action.payload
    }

})
