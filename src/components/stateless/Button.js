import React from 'react';

const Button = ({ style = {}, className = '', children = '', props }) => {
    return (
        <button
            type="button"
            style={style}
            className={`btn ${className}`}
            onClick={(event) => props.onClick(event)}
            {...props}>
            {children}
        </button>
    );
}

export default Button;
