import {setAuthorised, setToken} from "../redux/authorisationReducer";

export default function logout(navigate, dispatch) {
    localStorage.removeItem('authorised')
    localStorage.removeItem('token')
    sessionStorage.removeItem('authorised')
    sessionStorage.removeItem('token')
    dispatch(setToken(null))
    dispatch(setAuthorised(false))
    navigate('/')
}