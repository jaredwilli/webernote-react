import React from 'react';

const SelectMenu = ({ defaultValue = 'Choose an option...', ...props }) => {
    if (!props) {
        return <div className="empty hidden"></div>;
    }

    const selectedValue = props.value || defaultValue;

    return (
        <select
            name={props.name}
            value={selectedValue}
            className={props.className}
            onChange={(e) => props.onChange(e)}>
            {props.children}
        </select>
    );
}

export default SelectMenu;
