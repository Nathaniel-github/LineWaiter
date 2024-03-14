import React, {useState} from 'react'
import './login.module.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { sha3_256 } from 'js-sha3'
import styles from "./login.module.css";
import { Link } from 'react-router-dom';


const SignupForm = ( ) => {

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        setEmail(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = sha3_256(password[""].toString());
    let data = {
      username: username[""],
      password: hashedPassword,
        email: email[""]
    };
    // Handle form submission logic here
    fetch('/createAnAccount/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                setSuccessMessage("Account created successfully! Please return to login page: ");
            } else {
                setSuccessMessage("Account creation failed. Account already exists, please return to login page: ");
            }

        })
        .catch(error => {
            console.error("Error:", error);
            setSuccessMessage("Error occurred during account creation");
        });
    };

    return (
        <div className={styles.login}> {/* Use className from CSS module */}
            <div className={styles.wrapper}> {/* Use className from CSS module */}
                <form action="">
                    <h1>Sign Up</h1>
                    <div className={styles['input-box']}> {/* Use className from CSS module */}
                        <input type="text" onChange={handleChangeUsername} placeholder="Username" required/>
                        <FaUser className={styles.icon}/>
                    </div>
                    <div className={styles['input-box']}> {/* Use className from CSS module */}
                        <input type="password" onChange={handleChangePassword} placeholder="Password" required/>
                        <FaLock className={styles.icon}/>
                    </div>
                    <div className={styles['input-box']}> {/* Use className from CSS module */}
                        <input type="text" onChange={handleChangeEmail} placeholder="Email" required/>
                        <FaUser className={styles.icon}/>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>
                {successMessage &&
                    <p className={styles['sign-up-success-message']}>{successMessage}<Link to="/login">Login</Link></p>}

            </div>
        </div>
    )
}

export default SignupForm;
