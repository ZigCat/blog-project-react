import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./layout.scss";
import PostModal from "../components/PostModal";

const Layout = ({children}) => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useNavigate();

    const handleScroll = () => {
        if (isModalOpen) {
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

    useEffect(() => {
        handleScroll();
    }, [isModalOpen]);
    
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        setActivePage(location.pathname);
        console.log(location.pathname);
    }, [location])


    return ( 
        <div className="layout">
            {isModalOpen
                ? <PostModal closeModal={closeModal}/>
                : ""
            }
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
            <div className="layout-inner">
                {children}
            </div>
        </div>
    );
}
 
export default Layout;