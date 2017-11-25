import React from 'react';

import Button from '../../stateless/Button';
import FontAwesome from '../../shared/FontAwesome';

const HambyBtn = (props) => (
    <Button
        className="hamburger btn"
        onClick={props.onClick}>
        <FontAwesome className="bars" />
    </Button>
);

export default HambyBtn;
