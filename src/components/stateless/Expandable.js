import React from 'react';

const Expandable = ({ props }) => {
    return (
        <div className="expandable"
            onClick={(event) => props.onClick(event, props.type)}
            {...props}>
            {props.children}
        </div>
    );
}

export default Expandable;
