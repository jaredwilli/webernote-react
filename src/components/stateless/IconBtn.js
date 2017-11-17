import React from 'react';
import IconButton from 'material-ui/IconButton';

const IconBtn = ({ style = {}, iconClass = 'file-text-o', ...props }) => {
    style.height = '';
    style.padding = 0;

    return <IconButton onClick={props.onclick}
            iconClassName={'fa fa-' + iconClass}
            style={style} />
}

export default IconBtn;
