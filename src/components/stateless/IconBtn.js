import React from 'react';
import IconButton from 'material-ui/IconButton';

const IconBtn = ({ style = {}, iconClass = 'file-text-o', props }) => {
    style.height = '';
    style.padding = 0;

    return (
        <IconButton
            iconClassName={'fa fa-' + iconClass}
            onClick={(event) => props.onClick(event)}
            style={style} />
    );
}

export default IconBtn;


/*
import React from 'react';
import FontAwesome from 'react-fontawesome';

const IconBtn = ({ style = {}, iconClass = 'file-text-o', ...props }) => {
    style.height = '';
    style.padding = 0;

    // FA API: https://goo.gl/hPPwud
    return (
        <FontAwesome
            onClick={(e) => props.onClick(e)}
            name={iconClass}
            style={style}
            {...props} />
    );
}

export default IconBtn;
 */
