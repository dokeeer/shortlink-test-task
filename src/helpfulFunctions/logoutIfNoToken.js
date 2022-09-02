export default function logoutIfNoToken (navigate) {
    if (sessionStorage.getItem('token') === null && localStorage.getItem('token') === null) {
        navigate('/')
    }
}