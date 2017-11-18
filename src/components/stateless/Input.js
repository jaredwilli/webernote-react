import React from 'react'

const Input = ({ type = 'text', ...props }) => {
    return (
        <input
            type={type}
            value={props.value}
            {...props} />
    );
}

export default Input;
