import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux";
import {HashRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AutoRedirect from "./pages/AutoRedirect";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route path='/' element={<LoginPage />}/>
                <Route path='/signup' element={<SignupPage />}/>
                <Route path='/my-links' element={<App/>}/>
            </Routes>
        </HashRouter>
    </Provider>
);

