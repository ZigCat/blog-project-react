import React from "react";
import cl from "./erroritem.module.css";

const ErrorItem = ({message}) => {
    return (
        <div className={cl.error}>
            <h1>{message}</h1>
            <img src="../bone-broken.svg" alt=""/>
        </div>
    );
};

export default ErrorItem;