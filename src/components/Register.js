import React, { useState } from "react";
import { fetchRegister } from "../fetch";
import { Link } from 'react-router-dom';



const Register = (props) => {
    const {setUser} = props;
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

return (
    <div>
        <form onSubmit={ async (ev) =>  {
            
            try {
                ev.preventDefault();
                const res = await fetchRegister(username, password);
                console.log(res);
                const token = res.token
                if(!res.error) {
                    window.localStorage.setItem('token', token);
                    setMessage({message: 'Register was successful'})
                    setUser(res.user)
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
                {message.message && <p>{message.message}</p>}
            </div>
        </div>
    )
}



export default Register