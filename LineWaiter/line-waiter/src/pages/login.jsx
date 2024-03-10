import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import {FaLock, FaUser} from "react-icons/fa"; // Import CSS module

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
    let data = {
      username: username,
      password: password,
    };
    console.log(data);
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

          <div className={styles['remember-forgot']}> {/* Use className from CSS module */}
            <label><input type="checkbox" />Remember Me</label>
            <Link to="#">Forgot Password?</Link>
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
