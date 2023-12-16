import React from 'react';
import cl from "./button.module.css";
import {useNavigate} from "react-router-dom";

const Button = ({children, onClick, redirect, color}) => {
    const navigate = useNavigate();

    const go = () => {
        navigate(redirect);
    }
    return (
        <button className={cl.button} onClick={onClick ? onClick : go} style={color}>
            {children}
        </button>
    );
};

export default Button;