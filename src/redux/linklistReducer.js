import {createReducer} from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";

const initialState = {
    order: 'asc_short'
}

export const setOrder = createAction('SET_ORDER')

export const linklistReducer = createReducer(initialState, {
    [setOrder]: (state, action) => {
        state.order = action.payload
    },
})
