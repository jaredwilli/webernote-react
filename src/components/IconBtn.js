import React from 'react';
import IconButton from 'material-ui/IconButton';


function IconBtn(props) {
    // let disabled = (props.disabled) ? 'disabled={props.disabled}' : '';
    let style = props.style || {};
    style.height = '';
    style.padding = 0;

    return (
        <IconButton onClick={props.onclick} iconClassName="fa fa-github" style={style} />
    );
}

export default IconBtn;
