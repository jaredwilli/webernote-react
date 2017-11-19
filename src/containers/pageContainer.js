import React from 'react';
import PropTypes from 'prop-types'

import Home from '../components/Home';

const PAGES = {
    home: Home
};

const PageContainer = ({ page = 'home', props }) => {
    const Handler = PAGES[page];
    return <Handler {...props} />
};

PageContainer.propTypes = {
    page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};

export default PageContainer;
