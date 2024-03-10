import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './login.module.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { sha3_256 } from 'js-sha3'

const SignupForm = ( ) => {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    const handleChangeUsername = (e) => {
        const { name, value } = e.target;
        setUsername(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = sha3_256(password);
    let data = {
      username: username,
      password: hashedPassword,
    };
    // Handle form submission logic here
    console.log(data);
  };

    return (
        <div className="wrapper">
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" onChange={handleChangeUsername} placeholder="Username" required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" onChange={handleChangePassword} placeholder="Password" required />
                    <FaLock className="icon"/>
                </div>

                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;
