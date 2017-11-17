import React from 'react';
import Button from './Button'

const CloseBtn = ({ style = {}, ...props }) => <Button className="close" style={style} aria-label="Close" onClick={(e) => props.onClick(e)}><span aria-hidden="true">&times;</span></Button>;

export default CloseBtn;
