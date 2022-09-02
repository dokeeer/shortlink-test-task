import {setAuthorised, setError, setToken} from "./redux/authorisationReducer";


export const signUp = async (login, password, dispatch) => {
    let response = await fetch(`http://79.143.31.216/register?username=${login}&password=${password}`, {
        method: 'POST'
    });
    if (response.ok) {
        let json = await response.json();
        dispatch(setError(false))
    } else {
        dispatch(setError(true))
        throw('error')
    }
}

export const logIn = async (login, password, dispatch) => {
    let response = await fetch("http://79.143.31.216/login", {
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
    } else {
        dispatch(setAuthorised(false))
    }
}

export const setData = async (order, limit, offset, setter, token) => {
    let response = await fetch(`http://79.143.31.216/statistics?order=${order}&offset=${offset}&limit=${limit}`, {
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    if (response.ok) {
        let json = await response.json();
        console.log(json)
        console.log(order)
        setter(json)
    } else {
        console.log(response)
    }
}

export const setPageNum = async (setter, token) => {
    let response = await fetch(`http://79.143.31.216/statistics?
    order=asc_short&offset=0&`, {
        headers: {
            Authorization:`Bearer ${token}`
        }
    })
    if (response.ok) {
        let json = await response.json();
        const pages = Math.ceil(json.length/5)
        setter(Math.ceil(json.length/5))
    } else {
        console.log(response)
    }
}

export const makeLink = async (link, token, setter) => {
    let response = await fetch(`http://79.143.31.216/squeeze?link=${link}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
    if (response.ok) {
        let json = await response.json();
        setter(false)
    } else {
        setter(true)
    }
}