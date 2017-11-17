import React from 'react';
import Button from './Button';

const HambyBtn = (props) => (
    <Button
        className="hamburger"
        onClick={props.onClick}>
        <i className="fa fa-bars"></i>
    </Button>
);

export default HambyBtn;
