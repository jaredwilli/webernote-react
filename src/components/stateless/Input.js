import React from 'react'

const Input = ({ type = 'text', ...props }) => {
    let textInput = null;

    // Using refs to autofocus input
    // https://reactjs.org/docs/refs-and-the-dom.html

    return (
        <span>
            {props.focus && <input type="text" ref={(input) => { textInput = input; }} />}
            <input
                type={type}
                value={props.value}
                {...props} />
        </span>
    );
}

export default Input;
