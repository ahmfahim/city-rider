import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link, useHistory, useLocation } from "react-router-dom";
import './Login.css';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleInitializeApp, signInWithEmailAndPassword } from './LoginManager';
import { useContext } from 'react';
import { UserContext } from '../../App';


const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    // initialize app
    handleInitializeApp()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    // handle google sign in 
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    // handle create email
    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    //handle submit 
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        event.preventDefault();
    }
    // handle response 
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="login-form-body">
                    <form onSubmit={handleSubmit}>
                        {newUser ? <h3>Create An Account</h3> : <h3>Login</h3>}

                        {newUser && <input
                            className="login-input"
                            type="text"
                            onBlur={handleBlur}
                            required
                            placeholder="Name" />}

                        <br />

                        <input
                            className="login-input"
                            type="email" name="email"
                            onBlur={handleBlur}
                            required
                            placeholder="Username or Email" />

                        <br />

                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            onBlur={handleBlur}
                            required
                            placeholder="Password" />

                        <br />

                        {!newUser && <p className="forgot-body"><input type="checkbox" name="" id="" />Remember me <Link className="forgot-btn">Forgot Password</Link> </p>}

                        {newUser && <input
                            className="login-input"
                            type="password"
                            onBlur={handleBlur}
                            name="password"
                            required
                            placeholder="Confirm Password" />}

                        <br />

                        <input
                            className="login-input sign-btn"
                            type="submit"
                            value={newUser ? "Create Account" : "Login"} />

                        <br />

                        <p className="formControl">Already have an account? <span onClick={() => setNewUser(!newUser)}>Login</span></p>

                        <div className="display-error">
                            <p style={{ color: 'red' }}>{user.error}</p>
                            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Login'} successfully! </p>}
                        </div>

                    </form>
                </div>

                <div className="container other-option">
                    <p>or</p>
                    <button
                        className="signInGoogleBtn"
                        onClick={googleSignIn}>
                        <FcGoogle className="s-icon" />
                        Continue with google
                    </button>

                    <br />

                    <button
                        className="signInFbBtn">
                        <FaFacebook className="s-icon" />
                        Continue with facebook
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Login;