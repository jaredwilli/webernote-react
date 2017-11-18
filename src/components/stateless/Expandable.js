import React from 'react';

const Expandable = ({ ...props }) => {
    return (
        <div className="expandable"
            onClick={e => props.onClick(e, props.type)}>
            {props.type}
        </div>
    );
}

export default Expandable;
