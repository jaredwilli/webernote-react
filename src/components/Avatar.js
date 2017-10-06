import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { blue300, indigo900 } from 'material-ui/styles/colors';

function UserImg(props) {
    let imgSrc = props.imgSrc || '';
    let size = props.size;
    let style = props.style || {};

    if (props.icon) {
        let color = props.color || 'blue300';
        let backgroundColor = props.backgroundColor || 'indigo900';

        return (
            <Avatar icon={<FontIcon className={props.icon} />}
                color={color}
                backgroundColor={backgroundColor}
                size={size}
                style={style} />
        )
    }

    return (
        <Avatar src={imgSrc} size={size} style={style} />
    );
}

export default UserImg;
