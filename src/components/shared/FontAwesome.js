import React from 'react'

const FontAwesome = ({ className = 'note', ...props }) => {
    return <i className={'fa fa-' + className} {...props}></i>;
}

export default FontAwesome;
