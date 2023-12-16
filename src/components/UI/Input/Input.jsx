import React from 'react';
import cl from "./input.module.css";

const Input = ({type, value, onChange, placeholder}) => {
    return (
        <input
            type={type}
            placeholder={placeholder ? placeholder : ""}
            value={value}
            onChange={onChange}
            className={cl.input}
        />
    );
};

export default Input;