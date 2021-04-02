import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../LKAB-toplogo.png';
import Auth from '../auth/Auth';
import AddCircle from '../../icons/1x/baseline_add_circle_24dp.png';
import Desc from '../../icons/1x/baseline_description_white_24dp.png';
import Person from '../../icons/1x/baseline_person_white_24dp.png';

import './NavBar.css';

const NavBar = () => {
    const user = Auth.GetUser();

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
                        <span className="userInfo">
                            <img className="" src={Person} alt="User" />
                            <p>{user.name}</p>
                        </span>
                    </li>
                    <li>
                        <Link to="/report">
                            <span className="navBtn">
                                <img className="" src={Desc} alt="Report" />
                                <p>Nätrapport</p>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/new/head">
                            <span className="navBtn">
                                <img className="" src={AddCircle} alt="Add" />
                                <p>Ny Koppling</p>
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
