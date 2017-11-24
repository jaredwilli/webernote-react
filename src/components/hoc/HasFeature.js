import React from 'react';
import PropTypes from 'prop-types';

import { hasFeature } from '../../common/featureService';

const HasFeature = ({ name = '', ComposedComponent }) => {
    return hasFeature(name) ? <ComposedComponent { ...this.props } /> : null;
};

HasFeature.propTypes = {
    name: PropTypes.string.isRequired,
    ComposedComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};

export default HasFeature;
