import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import * as colors from 'material-ui/styles/colors';

import { randomVal, randomLetter } from '../common/userHelpers';

const UserPhoto = ({ imgSrc = '', style = {}, size = 20, fontColor = '#fff', ...props }) => {
    let bgColor = props.bgColor || randomVal(colors);
    let letter = props.letter || randomLetter();

    if (!imgSrc) {
        return (
            <Avatar
                color={fontColor}
                backgroundColor={bgColor}
                size={size}
                style={style}>
                {letter}
            </Avatar>
        );
    }

    return (
        <Avatar
            src={imgSrc}
            size={size}
            style={style} />
        );
}

UserPhoto.propTypes = {
    imgSrc: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
    fontColor: PropTypes.string,
    bgColor: PropTypes.string,
    letter: PropTypes.string
};

export default UserPhoto;
