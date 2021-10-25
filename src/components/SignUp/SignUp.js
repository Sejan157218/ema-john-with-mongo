import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './SignUp.css'

const SignUp = () => {
    const { signInGoogle } = useAuth()
    return (
        <div className="login-form">
            <div >
                <form onSubmit=''>
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="Email" />
                    <br />
                    <input type="password" placeholder="Password" />
                    <br />
                    <input type="password" placeholder="re-enter-Password" />
                    <br />
                    <input type="submit" value="Submit" />
                    <p>Already have an account ? <Link to="/login">Login</Link></p>
                </form>
                <button onClick={signInGoogle} className="btn-regular">Google Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;