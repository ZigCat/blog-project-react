import React from 'react';
import cl from "./deletebutton.module.css";

const DeleteButton = ({onClick}) => {
    return (
        <div className={cl.deletebutton} onClick={onClick}>
            <img src="../trash.svg" alt=""/>
        </div>
    );
};

export default DeleteButton;