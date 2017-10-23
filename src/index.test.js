import React from 'react';
import ReactDOM from 'react-dom';

import Webernote from './index';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Webernote />, div);
});
