import React from 'react'
import './Header.css'
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className='header'>
           <Link to='/' style={{ textDecoration: 'none'}}>
                <div className="logo">
                    <img src="assets/ethical.jpg" alt="brand-logo" />
                    <h3>Ethical Solutions</h3>
                </div> 
            </Link>
            <div className="search-bar">
                    <Link to={'/search'} >
                     <i class="fas fa-search"></i>

                    </Link>
                    <input type="text"  placeholder="Where are you going?"/>
                </div>
           
            

            <div className='header__right'>
                <button>
                    <a href="http://localhost:1337/connect/auth0">Login</a>
                </button>
                <Avatar />
            </div>
        </div>
    )
}

export default Header
