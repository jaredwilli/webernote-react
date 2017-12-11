import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ style = {}, ...props }) => {
    return (
        <button
            type="button"
            style={ style }
            className={ `${props.className} btn` }
            onClick={ event => props.onClick(event) }
            { ...props }>
            { props.children }
        </button>
    );
}

Button.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
};

export default Button;
