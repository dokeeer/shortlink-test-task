export default function redirect (navigate) {
    if ((   JSON.parse(localStorage.getItem('authorised')) === true
            &&
            (localStorage.getItem('token')) !== null)
        || (
            JSON.parse(sessionStorage.getItem('authorised')) === true
            &&
            (sessionStorage.getItem('token')))) {
        navigate('/my-links')
    }
}