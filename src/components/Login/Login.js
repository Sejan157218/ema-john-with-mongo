import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './Login.css'

const Login = () => {
    const { signInGoogle } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const redirect = location.state?.from || "/";

    const handlerToSignIn = () => {
        signInGoogle()
            .then((result) => {
                history.push(redirect)
            })
    }
    return (
        <div className="login-form">
            <div >
                <form onSubmit=''>
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" />
                    <br />
                    <input type="password" placeholder="Password" />
                    <br />
                    <input type="submit" value="Submit" />
                    <p>Dont't have an account ? <Link to="/signup">SingUp</Link></p>
                </form>
                <button className="btn-regular" onClick={handlerToSignIn}>Google login in</button>
            </div>
        </div>
    );
};

export default Login;