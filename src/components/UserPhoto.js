import React from 'react';
import Avatar from 'material-ui/Avatar';

import { randomVal, randomLetter } from '../common/userHelpers';
import * as colors from 'material-ui/styles/colors';

class UserPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: this.props.imgSrc || '',
            bgColor: this.props.color || randomVal(colors),
            letter: this.props.letter || randomLetter(),
            style: this.props.style || {},
            size: this.props.size || 20,
            fontColor: '#fff'
        };
    }

    render() {
        if (!this.props.imgSrc) {
            return (
                <Avatar color={this.state.fontColor}
                    backgroundColor={this.state.bgColor}
                    size={this.state.size}
                    style={this.state.style}>
                    {this.state.letter}
                </Avatar>
            )
        }

        return (
            <Avatar src={this.state.imgSrc}
                size={this.state.size}
                style={this.state.style} />
        );
    }
}

export default UserPhoto;
