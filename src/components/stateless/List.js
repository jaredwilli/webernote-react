import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map((item, index) =>
				    this.props.itemRenderer(item, index)
				)}
			</ul>
		);
	}
}

List.propTypes = {
	items: PropTypes.array,
	// itemRenderer: PropTypes.func.isRequired
};

List.defaultProps = {
    items: []
};

export default List;
