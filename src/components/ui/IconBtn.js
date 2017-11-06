import React from 'react';
import IconButton from 'material-ui/IconButton';

function IconBtn(props) {
    let iconClass = 'fa fa-' + props.iconClass || 'fa ';
    let style = props.style || {};
    style.height = '';
    style.padding = 0;

    return (
        <IconButton onClick={props.onclick} iconClassName={iconClass} style={style} />
    );
}

export default IconBtn;
