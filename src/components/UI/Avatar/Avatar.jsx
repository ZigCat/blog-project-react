import React from 'react';
import cl from "./avatar.module.css";
import {useNavigate} from "react-router-dom";

const Avatar = ({userId}) => {
    const router = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        router("/user/"+userId);
    }
    return (
        <>
            {userId
                ?
                <div className={cl.avatar} onClick={(event) => handleClick(event)}>
                    <img src="../user.svg" alt=""/>
                </div>
                :
                <div className={cl.avatar} style={{cursor: 'auto'}}>
                    <img src="../user.svg" alt=""/>
                </div>
            }
        </>
    );
};

export default Avatar;