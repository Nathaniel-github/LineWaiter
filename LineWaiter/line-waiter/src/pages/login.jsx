import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import {FaLock, FaUser} from "react-icons/fa"; // Import CSS module
import { sha3_256 } from 'js-sha3'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password)

    const data = {
      username: username,
      password: sha3_256(password),
    };
    console.log(data);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      // Check if the response is successful
      if (response.ok) {
        // Parse the response data as JSON
        console.log(response.json());
      } else {
        // Handle the error
        throw new Error('Error: ' + response.status);
      }
    })
  };

  return (
    <div className={styles.login}> {/* Use className from CSS module */}
      <div className={styles.wrapper}> {/* Use className from CSS module */}
        <form action="">
          <h1>Login</h1>
          <div className={styles['input-box']}> {/* Use className from CSS module */}
            <input type="text" onChange={handleChangeUsername} placeholder="Username" required />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles['input-box']}> {/* Use className from CSS module */}
            <input type="password" onChange={handleChangePassword} placeholder="Password" required />
            <FaLock className={styles.icon} />
          </div>

          <button type="submit" onClick={handleSubmit}>Login</button>

          <div className={styles['register-link']}> {/* Use className from CSS module */}
            <p>Don't have an account? <Link to="/signup">Register Now!</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
