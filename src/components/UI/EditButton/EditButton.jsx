import React from 'react';
import cl from "./editbutton.module.css";

const EditButton = ({onClick}) => {
    return (
        <div className={cl.editbutton} onClick={onClick}>
            <img src="../edit.svg" alt=""/>
        </div>
    );
};

export default EditButton;