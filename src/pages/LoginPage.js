import React, {useEffect} from 'react'
import './AuthPage.css'
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {logIn} from "../asyncFunctions"
import {useNavigate} from "react-router-dom"
import redirect from "../helpfulFunctions/checkIsAuthorised"

const LoginPage = () => {

    const isAuthorised = useSelector(state=>state.authorisation.authorised)
    const token = useSelector(state=>state.authorisation.token)
    const loginError = useSelector(state=>state.authorisation.loginError)
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    })

    const [remember, setRemember] = useState(false)

    const handleFormChange = (event, field) => {
        event.preventDefault()
        setUserInfo({
            ...userInfo,
            [field]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        logIn(userInfo.username, userInfo.password, dispatch)
    }

    const handleRemember = (e) => {

    }

    useEffect(()=>{
        redirect(navigate)
        if (isAuthorised) {
            if (remember) {
                localStorage.setItem('authorised', true)
                localStorage.setItem('token', token)
            }
            sessionStorage.setItem('authorised', true)
            sessionStorage.setItem('token', token)
            navigate('my-links')
        }
    }, [isAuthorised])


    return (
        <div className='auth-page'>
            <div className='auth-formholder'>
                <div className='form_prompt'>
                    <span>Authorisation</span>
                </div>
                {loginError
                    ?<div className='login-error'>Password or/and login is incorrect</div>
                    :''}
                <form className='login-form' onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => handleFormChange(e, 'username')}
                        type='text' className='form_input' placeholder='Login'
                    />
                    <input
                        onChange={(e) => handleFormChange(e, 'password')}
                        type='password' className='form_input' placeholder='Password'
                    />
                    <div className='remember-box'>
                    <input
                        checked={remember}
                        onChange={(e)=>setRemember(e.target.checked)}
                        type='checkbox' id='remember' className='remember_checkbox'
                    />
                    <label htmlFor='remember' className='r'> Remember me</label>
                    </div>
                    <input type='submit' className='form_submit' value='Log in'/>
                </form>
                <div className='signup_link-holder'>
                    <a className='signup_link' href='/signup'>Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;