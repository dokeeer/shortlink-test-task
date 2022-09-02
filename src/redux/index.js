import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {authorisationReducer} from "./authorisationReducer";
import {linklistReducer} from "./linklistReducer";

const rootReducer = combineReducers({
    authorisation: authorisationReducer,
    linklist: linklistReducer
})

export const store = configureStore({
    reducer: rootReducer
})