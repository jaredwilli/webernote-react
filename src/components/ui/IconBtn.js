import React from 'react';
import IconButton from 'material-ui/IconButton';

function IconBtn(props) {
    // let disabled = (props.disabled) ? 'disabled={props.disabled}' : '';
    let iconClass = props.iconClass || 'file-text-o';
    let style = props.style || {};
    style.height = '';
    style.padding = 0;

    return (
        <IconButton onClick={props.onclick}
            iconClassName={'fa fa-' + iconClass}
            style={style} />
    );
}

export default IconBtn;
