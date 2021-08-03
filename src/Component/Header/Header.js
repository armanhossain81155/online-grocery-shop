import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo  from './img1/grocery-logo .png';



const Header = () => {
    return (
        <div>
            
            <nav className="nav">
                
               
            <ul>
                <li className="img-logo">
                <img src={logo} alt="" />
                </li>
                <li>
                <Link to="/home">Home</Link>
               
                </li>
                <li>
                <Link to="/destination">Destination</Link>
               
               
                </li>
                <li>
                <Link to="/blog">Blog</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/login" className="login-list">LogIn</Link>
                </li>
            </ul>
               


            </nav>
        </div>
    );
};

export default Header;