import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './login.module.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { sha3_256 } from 'js-sha3'
import styles from "./login.module.css";

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
    const hashedPassword = sha3_256(password.toString());
    let data = {
      username: username[""],
      password: hashedPassword,
    };
    console.log("reached");
    // Handle form submission logic here
    console.log(data);

    fetch('/createAnAccount/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res);
    })

  };

    return (
        <div className={styles.login}> {/* Use className from CSS module */}
            <div className={styles.wrapper}> {/* Use className from CSS module */}
                <form action="">
                    <h1>Sign Up</h1>
                    <div className={styles['input-box']}> {/* Use className from CSS module */}
                        <input type="text" onChange={handleChangeUsername} placeholder="username" required/>
                        <FaUser className={styles.icon}/>
                    </div>
                    <div className={styles['input-box']}> {/* Use className from CSS module */}
                        <input type="password" onChange={handleChangePassword} placeholder="Password" required/>
                        <FaLock className={styles.icon}/>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;
