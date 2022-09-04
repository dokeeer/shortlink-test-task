import {createReducer, createAction} from "@reduxjs/toolkit";

const initialState = {
    order: 'desc_target',
    loading: false
}

export const setOrder = createAction('SET_ORDER')
export const setLoading = createAction('SET_LOADING')

export const linklistReducer = createReducer(initialState, {
    [setOrder]: (state, action) => {
        state.order = action.payload
    },
    [setLoading]: (state, action) => {
        state.loading = action.payload
    }
})
