import React from 'react';

const Button = ({ style = {}, ...props }) => {
    return (
        <button
            type="button"
            style={style}
            className={props.className + ' btn'}
            onClick={(e) => props.onClick(e)}
            {...props}>
            {props.children}
        </button>
    );
}

export default Button;
