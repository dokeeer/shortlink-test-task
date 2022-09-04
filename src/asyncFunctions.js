import {setAuthorised, setError, setLoginError, setToken} from "./redux/authorisationReducer";
import {setLoading} from "./redux/linklistReducer";
import {createLinkFaultNotification, createLinkNotification} from "./helpfulFunctions/notificationFunctions";

const URL = 'http://79.143.31.216/'

export const signUp = async (login, password, dispatch) => {
    let response = await fetch(`${URL}register?username=${login}&password=${password}`, {
        method: 'POST'
    }).catch(()=>{});
    if (response.ok) {
        dispatch(setError(false))
    } else {
        dispatch(setError(true))
        throw('error')
    }
}

export const logIn = async (login, password, dispatch) => {
    let response = await fetch(`${URL}login`, {
        body: `grant_type=&username=${login}&password=${password}&scope=&client_id=&client_secret=`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    })
    if (response.ok) {
        let json = await response.json();
        dispatch(setAuthorised(true))
        dispatch(setToken(json.access_token))
        dispatch(setLoginError(false))
        localStorage.setItem('user', login)
    } else {
        dispatch(setLoginError(true))
        dispatch(setAuthorised(false))
    }
}

export const setData = async (order, limit, offset, setter, token, dispatch) => {
    dispatch(setLoading(true))
    let response = await fetch(`${URL}statistics?order=${order}&offset=${offset}&limit=${limit}`, {
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    if (response.ok) {
        let json = await response.json();
        setter(json)
    }
    dispatch(setLoading(false))
}

export const setPageNum = async (setter, token) => {
    let response = await fetch(`${URL}statistics?order=asc_short&offset=0&`,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    if (response.ok) {
        let json = await response.json();
        const pages = Math.ceil(json.length/5)
        setter(pages)
    }
}

export const makeLink = async (link, token, setter) => {
    let response = await fetch(`${URL}squeeze?link=${link}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
    if (response.ok) {
        setter(false)
        createLinkNotification(link)
    } else {
        setter(true)
        createLinkFaultNotification(link)
    }
}