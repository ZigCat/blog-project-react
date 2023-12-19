import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./layout.scss";
import PostModal from "../components/PostModal";
import Avatar from "../components/UI/Avatar/Avatar";
import Menu from "../components/mobile/menu/Menu";

const Layout = ({children}) => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const router = useNavigate();

    const handleScroll = () => {
        if (isModalOpen || menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openMenu = () => {
        setMenu(true);
        document.getElementById("mobmenu").style.display = 'block';
        document.getElementById("mobmenu-body").style.width = '30%';
    }

    const closeMenu = () => {
        setMenu(false);
        document.getElementById("mobmenu").style.display = 'none';
        document.getElementById("mobmenu-body").style.width = '0';
    }
    
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        setActivePage(location.pathname);
        closeMenu();
    }, [location])

    useEffect(() => {
        handleScroll();
    }, [isModalOpen, menu]);


    return ( 
        <div className="layout">
            {isModalOpen
                ? <PostModal closeModal={closeModal}/>
                : ""
            }
            <Menu closeMenu={closeMenu}/>
            <div className="layout-left">
                <div className="container-head">
                    <div className="layout-left-inner">
                        <nav className="layout-left-nav">
                            <div className="layout-left-logo">
                                <Link to="/">
                                    <img src="../logo.svg" alt="BlogPlatform's Logo"/>
                                </Link>
                            </div>
                            <li className={"layout-left-nav-el"+(activePage === '/home' ? " active" : "")}>
                                <Link to="/home">
                                    <img src="../home.svg" alt="Home"/>
                                </Link>
                            </li>
                            <li className={"layout-left-nav-el"+(activePage === '/explore' ? " active" : "")}>
                                <Link to="/explore">
                                    <img src="../search.svg" alt="Explore"/>
                                </Link>
                            </li>
                            <li className={"layout-left-nav-el"+(activePage === '/user' ? " active" : "")} onClick={() => router("/user/"+localStorage.getItem("id"))}>
                                <img src="../user.svg" alt="Your page"/>
                            </li>
                            <li className={"layout-left-nav-el"+(activePage === '/users' ? " active" : "")}>
                                <Link to="/users">
                                    <img src="../users.svg" alt="Users"/>
                                </Link>
                            </li>
                            <li className={"layout-left-nav-el"+(activePage === '/about' ? " active" : "")}>
                                <Link to="/about">
                                    <img src="../about.svg" alt="About"/>
                                </Link>
                            </li>
                            <li onClick={logout}>
                                <img src="../logout.svg" alt="Logout"/>
                            </li>
                            <li onClick={() => openModal()}>
                                <img src="../plus.svg" alt="Write a post"/>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="layout-menu">
                <div className="layout-menu-inner">
                    <div className="layout-menu-opener" onClick={() => openMenu()}>
                        <img src="../menu.svg" alt=""/>
                    </div>
                    <Avatar />
                </div>
            </div>

            <div className="layout-inner">
                {children}
            </div>
        </div>
    );
}
 
export default Layout;