import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import useAuth from '../hooks/useAuth';
import './Header.css';

const Header = () => {
    const { user,logOut } = useAuth()
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>

                {
                   user.email && <span style={{color:'white'}}>Hello {user.displayName}</span> 
                }
                {user.email ? 
                <button onClick={logOut}>Log Out</button>
                :
                <Link to="/login">Login</Link>
            
            }

            </nav>
        </div>
    );
};

export default Header;