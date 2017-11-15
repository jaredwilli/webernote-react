import React from 'react';

const SelectMenu = (props) => {
    if (!props) {
        return <div className="empty hidden"></div>;
    }

    const defaultValue = (props.defaultValue) ? props.defaultValue : 'Choose an option...';
    const selectedValue = (props.value) ? props.value : defaultValue;

    return (
        <select
            name={props.name}
            className={props.className}
            value={selectedValue}
            onChange={(e) => props.onChange(e)}>
            {props.children}
        </select>
    );
}

export default SelectMenu;
