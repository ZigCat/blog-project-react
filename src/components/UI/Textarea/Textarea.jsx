import React, {useEffect, useRef, useState} from 'react';
import cl from "./textarea.module.css";

const Textarea = ({value, onChange, placeholder}) => {
    const textareaRef = useRef(null);

    const autosize = () => {
        const el = textareaRef.current;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    };

    useEffect(() => {
        autosize();
    }, [value]);
    return (
        <textarea
            className={cl.textarea}
            placeholder={placeholder}
            ref={textareaRef}
            value={value}
            onChange={onChange}
        ></textarea>
    );
};

export default Textarea;