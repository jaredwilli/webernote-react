import React from 'react';
import Button from './Button';
import FontAwesome from './FontAwesome'

const HambyBtn = ({ props }) => (
    <Button
        className="hamburger"
        onClick={(event) => props.onClick(event)}
        {...props}>
        <FontAwesome className="bars" />
    </Button>
);

export default HambyBtn;
