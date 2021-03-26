import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../LKAB-toplogo.png';
import AddCircle from '../../add_circle_outline-white-24dp/1x/baseline_add_circle_24dp.png';

import './NavBar.css';

const NavBar = () => {
    return (
        <div className="navContainer">
            <nav className="NavBar">
                <Link to="/">
                    <span className="logoText">
                        <img className="App-logo" src={Logo} alt="logo" />
                        <p>| Teleregistret</p>
                    </span>
                </Link>
                <ul>
                    <li>
                        <Link to="/new">
                            <span className="navBtn">
                                {/* <AddCircle/> */}
                                <img className="" src={AddCircle} alt="Add" />
                                <p>Ny koppling</p>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
