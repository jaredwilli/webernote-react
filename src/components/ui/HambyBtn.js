import React from 'react';

function HambyBtn(props) {
    return (
        <button className="hamburger" onClick={props.onClick}>
            <i className="fa fa-bars"></i>
        </button>
    );
}

export default HambyBtn;
