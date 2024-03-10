import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './login.module.css'
import { FaUser, FaLock } from 'react-icons/fa'

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
        let data = {
            "username" : username,
            "password" : password,
        }
        // Handle form submission logic here
        console.log(data);
    };

    const handleLogin = () => {
        const data = {
            username: username,
            password: password,
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            // Check if the response is successful
            if (response.ok) {
                // Parse the response data as JSON
                return response.json();
            } else {
                // Handle the error
                throw new Error('Error: ' + response.status);
            }
        }).then(data => {
            // Handle the response data
            console.log('Response data:', data);
        }).catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    }

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
