import React from 'react';
import cl from "./pageavatar.module.css";
import {useNavigate} from "react-router-dom";

const Avatar = () => {
    const router = useNavigate();
    return (
        <div className={cl.avatar}>
            <img src="../user.svg" alt=""/>
        </div>
    );
};

export default Avatar;