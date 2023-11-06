import React, { useContext, useState } from 'react'
import './Login.css'
import { server } from '../../constant/index.js';
import axios from "axios"
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const { authenticated, setAuth } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [signForm, setSignForm] = useState({ username: "", email: "", password: "" });
    const loginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    }
    const signChange = (e) => {
        const { name, value } = e.target;
        setSignForm({ ...signForm, [name]: value });
    }
    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const { data } = await axios.post(`${server}/voter/login`, { email: loginForm.email, password: loginForm.password }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            setAuth(true);
            setLoginForm({ email: "", password: "" });


            console.log(data);
        } catch (error) {
            console.log(error.response.data.message);

        }

    }

    const handleSign = async (e) => {
        e.preventDefault();
        console.log(signForm);
        try {
            const { data } = await axios.post(`${server}/voter/signup`, { username: signForm.username, email: signForm.email, password: signForm.password, role_id: 0 }, {
                'Content-Type': 'application/json'
            })
            console.log(data);
        } catch (error) {
            console.log(error.response.data.message)

        }
        setSignForm({ username: "", email: "", password: "" });

    }

    return (
        <div className='loginpage'>
            <div className="main">
                <input className='input' type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form onSubmit={handleSign}>
                        <label className='label' for="chk" aria-hidden="true">Sign up</label>
                        <input className='input' type="text" name="username" placeholder="User name" value={signForm.username} required onChange={signChange} />
                        <input className='input' type="email" name="email" placeholder="Email" value={signForm.email} required onChange={signChange} />
                        <input className='input' type="password" name="password" placeholder="Password" value={signForm.password} required onChange={signChange} />
                        <button className='button' type='submit'>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form onSubmit={handleLogin}>
                        <label className='label' for="chk" aria-hidden="true">Login</label>
                        <input className='input' type="email" name="email" placeholder="Email" value={loginForm.email} required onChange={loginChange} />
                        <input className='input' type="password" name="password" placeholder="Password" value={loginForm.password} required onChange={loginChange} />
                        <button className='button' type='submit'>Login</button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default Login
