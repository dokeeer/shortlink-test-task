import React, {useState} from 'react';
import './LoginPage.css'
import {signUp} from "../asyncFunctions";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'
import redirect from "../helpfulFunctions/checkIsAuthorised";
const SignupPage = () => {

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [matchError, setMatchError] = useState(false)

    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()

    const error = useSelector(store=>store.authorisation.error)

    const handleFormChange = (event, field) => {
        event.preventDefault()
        setUserInfo({
            ...userInfo,
            [field]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (userInfo.password === userInfo.confirmPassword) {
            setMatchError(false)
            signUp(userInfo.username, userInfo.password, dispatch)
                .then(()=>{
                    setSuccess(true)
                    setTimeout(() => navigate('/'), 2000)
                })
        }
        else setMatchError(true)
    }

    React.useEffect(()=>{
        redirect(navigate)
    }, [])


    return (
        <div className='login-page'>
            <div className='login-formholder'>
                { !success
                    ?
                    <div>
                        <div className='form_prompt'>
                            Sign up
                        </div>
                        {
                            matchError
                                ? <div className='error'>Passwords do not match.</div>
                                : ''
                        }
                        {
                            error
                            ? <div className='error'>User with this login already exists.</div>
                            : ''
                        }
                        <form className='login-form' onSubmit={handleSubmit}>
                            <input onChange={(e) => handleFormChange(e, 'username')} type='text' className='form_input' placeholder='Login'/>
                            <input onChange={(e) => handleFormChange(e, 'password')} type='password' className='form_input' placeholder='Password'/>
                            <input onChange={(e) => handleFormChange(e, 'confirmPassword')} type='password' className='form_input' placeholder='Confirm password'/>
                            <input type='submit' className='form_submit' value='Sign up'/>
                        </form>
                    </div>
                    :
                    <div className='redirect'>You successfully signed up.
                        <br/>You will be redirect to authorisation page in 2 seconds</div>}
            </div>
        </div>
    );
};

export default SignupPage;