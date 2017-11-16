import React from 'react';

function Button({ style={}, ...props }) {

    return (
        <button type="button"
            className={props.className + ' btn'}
            onClick={props.onClick}
            style={props.style}>

            {props.children}
        </button>
    );
}

export default Button;
