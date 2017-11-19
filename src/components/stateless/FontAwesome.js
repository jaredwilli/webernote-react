import React from 'react'

const FontAwesome = ({ name = 'note', props }) => {
    return <i className={'fa fa-' + name} {...props}></i>;
}

export default FontAwesome;
