import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

const Menu = ({closeMenu}) => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const router = useNavigate();

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location]);

    return (
        <div className="mobmenu">
            <div className="mobmenu-inner">
                <nav className="mobmenu-nav">
                    <div className="mobmenu-logo">
                        <Link to="/">
                            <img src="../logo.svg" alt="BlogPlatform's Logo"/>
                        </Link>
                    </div>
                    <li className={"mobmenu-nav-el"+(activePage === '/home' ? " active" : "")}>
                        <Link to="/home">
                            <img src="../home.svg" alt="Home"/>
                        </Link>
                    </li>
                    <li className={"mobmenu-nav-el"+(activePage === '/explore' ? " active" : "")}>
                        <Link to="/explore">
                            <img src="../search.svg" alt="Explore"/>
                        </Link>
                    </li>
                    <li className={"mobmenu-nav-el"+(activePage === '/user' ? " active" : "")} onClick={() => router("/user/"+localStorage.getItem("id"))}>
                        <img src="../user.svg" alt="Your page"/>
                    </li>
                    <li className={"mobmenu-nav-el"+(activePage === '/users' ? " active" : "")}>
                        <Link to="/users">
                            <img src="../users.svg" alt="Users"/>
                        </Link>
                    </li>
                    <li className={"mobmenu-nav-el"+(activePage === '/about' ? " active" : "")}>
                        <Link to="/about">
                            <img src="../about.svg" alt="About"/>
                        </Link>
                    </li>
                    <li onClick={logout}>
                        <img src="../logout.svg" alt="Logout"/>
                    </li>
                </nav>
            </div>
        </div>
    );
};

export default Menu;