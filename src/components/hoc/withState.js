import React from 'react';
import PropTypes from 'prop-types';

function withState(WrappedComponent) {
	return class Toggle extends React.Component {
		state = {
			on: this.props.on
		};

		toggle() {
			this.setState({
				on: !this.state.on
			});
		}

		render() {
			const stateProp = {
				on: this.state.on,
				toggle: () => this.toggle()
			};

			// Filter out HOC's props
			const { on, ...passThroughProps } = this.props;

			// Add state to WrappedComponent
			return <WrappedComponent { ...stateProp } { ...passThroughProps } />;
		}
	};
}

export const withStatePropTypes = {
	on: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired
};

export default withState;
