import React, { useState } from "react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
return (
    <div>
        <form onSubmit={ async (ev) =>  {
            
            try {
                ev.preventDefault();
            } catch (error) {
                console.error(error)
            }

        }}>
            <h1>Create Your Account!</h1>
        <input placeholder='username' value={username} onChange= {(ev) => {setUsername(ev.target.value)}}>Username</input>
        <input placeholder='password' value={password} onChange= {(ev) => {setPassword(ev.target.value)}}>Password</input>

        <button className="btn" disabled={!username || !password}>Create Account</button>
        </form>
    </div>
)

}