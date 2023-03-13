import React, { useState } from "react";

import { Link } from 'react-router-dom';

import { fetchLogin } from "../fetch";


const Login = (props) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

return (
    <div>
        

             <form onSubmit={ async (ev) =>  {
            
            try {
                ev.preventDefault();
                const res = await fetchLogin(username, password);
                console.log(res);
                if(!res.error) {
                    window.localStorage.setItem('token', res);
                    const redirHome = () => {
                        window.location.href ='/'
                    }
                    redirHome();
                }
            } catch (error) {
                console.error(error)
            }

        }}>
            <h1>Login To Your Account</h1>
        <input placeholder='username' value={username} onChange= {(ev) => {setUsername(ev.target.value)}}/>
        <input placeholder='password' value={password} onChange= {(ev) => {setPassword(ev.target.value)}}/>

                <button className="btn" disabled={!username || !password}>Login</button>

            </form>
            <div>
                <nav>
                    <Link to='/Register'>
                        <p className="login-text">Dont have an account?</p>
                        <p className="login-text">Click here to Register!</p>
                    </Link>
                </nav>
            </div>
        </div>
    )


}

export const Logout = (props) => {
    const {user} = props;
return { 
    if(props) { 
    <button classname='logout-container'onClick={ logout }>Logout</button>
        }
    }
}

export default Login