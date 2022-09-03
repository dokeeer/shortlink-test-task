import React from 'react';
import {useNavigate} from "react-router-dom";

const AutoRedirect = () => {
    const navigate = useNavigate()
    React.useEffect(()=>{
        navigate('/')
    }, [])
    return (
        <div>

        </div>
    );
};

export default AutoRedirect;