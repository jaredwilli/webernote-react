import React from 'react';

function CloseBtn(props) {

    let style = props.style || {};

    return (
        <button type="button" className="close" style={style} aria-label="Close"
            onClick={(e) => props.onClick(e)}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
}

export default CloseBtn;
