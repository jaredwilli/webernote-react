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


/*
import React from 'react';
// import Avatar from 'material-ui/Avatar';
// import * as colors from 'material-ui/styles/colors';

import { COLORS } from '../constants/noteConst';
import { randomVal, randomLetter } from '../common/userHelpers';

const UserPhoto = ({ imgSrc = '', className = '', style = {}, size = 20, ...props }) => {
    let colors = COLORS.map(color => color.hex );
    let bgColor = randomVal(colors);

    style.width = `${size}px`;
    style.height = `${size}px`;
    style.borderRadius = '50%';

    if (!imgSrc) {
        style.backgroundColor = bgColor;
        style.color = props.fontColor;

        return (
            <div
                style={style}>
                {randomLetter()}
            </div>
        );
    }

    return (
        <img src={imgSrc}
            style={style}
            className={`avatar ${className}`}
            {...props} />
    );
}

export default UserPhoto;
 */
