import React from 'react';
import Avatar from 'material-ui/Avatar';
import * as colors from 'material-ui/styles/colors';

import { randomVal, randomLetter } from '../common/userHelpers';

const UserPhoto = ({
    imgSrc='', bgColor=randomVal(colors), letter=randomLetter(),
    style={}, size=20, fontColor='#fff' }) => {

    if (!imgSrc) {
        return <Avatar color={fontColor} backgroundColor={bgColor} size={size} style={style}>{letter}</Avatar>;
    }

    return <Avatar src={imgSrc} size={size} style={style} />;
}

export default UserPhoto;
