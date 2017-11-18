import React from 'react';
import Button from './Button';
import FontAwesome from './FontAwesome'

const HambyBtn = (props) => (
    <Button
        className="hamburger"
        onClick={props.onClick}>
        <FontAwesome className="bars" />
    </Button>
);

export default HambyBtn;
