import React from 'react';
import PropTypes from 'prop-types';

export const Option = ({ text = 'Select an option...', ...props }) => {

    console.log(text, props);
    return (
        <option {...props}>
            {text}
        </option>
    );
}

Option.propTypes = {
    value: PropTypes.string,
    text: PropTypes.string
};

export default Option;
