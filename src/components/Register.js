import React, { useState } from "react";
import { fetchRegister } from "../fetch";
import { Link } from 'react-router-dom';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

return (
    <div>
        <form onSubmit={ async (ev) =>  {
            
            try {
                ev.preventDefault();
                const res = await fetchRegister(username, password);
                console.log(res);
                if(!res.error) {
                    window.localStorage.setItem('token', res.token);
                    const redirHome = () => {
                        window.location.href ='/'
                    }
                    redirHome();

                }


        } catch (error){
            throw error
        }
    }}>
            <h1>Create Your Account!</h1>
        <input placeholder='username' value={username} onChange= {(ev) => {setUsername(ev.target.value)}}/>
        <input placeholder='password' value={password} onChange= {(ev) => {setPassword(ev.target.value)}}/>


                <button className="btn" disabled={!username || !password}>Create Account</button>
            </form>
            <div>
                <nav>
                    <Link to='/Login'>
                        Click here to login.
                    </Link>
                </nav>
            </div>
        </div>
    )

}