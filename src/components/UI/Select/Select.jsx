import React from 'react';
import cl from "./select.module.css";

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            className={cl.select}
            value={value}
            onChange={onChange}
        >
            {defaultValue && <option disabled value="">{defaultValue}</option>}
            {options.map(option =>
                <option
                    key={option.value}
                    value={option.value}
                >{option.name}</option>
            )}
        </select>
    );
};

export default Select;