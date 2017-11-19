import React from 'react';
import Button from './Button'

const CloseBtn = ({ style = {}, className = '', props }) => {
    return (
        <Button
            style={style}
            className={`close ${className}`}
            aria-label="Close"
            onClick={(event) => props.onClick(event)}
            {...props}>
            <span aria-hidden="true">&times;</span>
        </Button>
    );
}

export default CloseBtn;
