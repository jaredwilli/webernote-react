import React from 'react';
import Avatar from 'material-ui/Avatar';
import * as colors from 'material-ui/styles/colors';
import { randomVal, randomLetter } from '../common/userHelpers';

function UserPhoto(props) {
    const imgSrc = props.imgSrc || '',
        bgColor = props.color || randomVal(colors),
        letter = props.letter || randomLetter(),
        style = props.style || {},
        size = props.size || 20,
        fontColor = '#fff';

    if (imgSrc === '') {
        return (
            <Avatar color={fontColor}
                backgroundColor={bgColor}
                size={size}
                style={style}>
                {letter}
            </Avatar>
        )
    }

    return <Avatar src={imgSrc} size={size} style={style} />
}

export default UserPhoto;
