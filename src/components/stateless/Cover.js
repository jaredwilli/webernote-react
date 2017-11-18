import React from 'react'

const Cover = ({ isActive = false, ...props }) => {
    const activeClass = (isActive) ? 'inline-block' : 'none';

    return (
        <div
            className={`cover ${activeClass}`}
            onClick={(e) => props.handleClose(e)}
            {...props} />
    );
}

export default Cover;
