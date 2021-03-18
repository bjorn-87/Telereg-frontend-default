import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../LKAB-toplogo.png';

// import Timeline from '@material-ui/icons/Timeline';

import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <Link to="/">
                <span className="logoText">
                    <img className="App-logo" src={Logo} alt="logo" />
                    <p>| Teleregistret</p>
                </span>
            </Link>
            <ul>
                <li>
                    <Link to="/">
                        <span className="navBtn">
                            <p>Linjer</p>
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;