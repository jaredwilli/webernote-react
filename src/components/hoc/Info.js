import React from 'react';
import withState, {withStatePropTypes} from './withState';

export function Info({on, toggle, children}) {
	if (on) {
		return (
			<span>
				<span id="toggleInfo" onClick={toggle}>Hide info: </span>
				{children}
			</span>
		);
	} else {
		return <span id="toggleInfo" onClick={toggle}>Show info</span>;
	}
}

Info.propTypes = Object.assign({}, withStatePropTypes, {
	children: React.PropTypes.node.isRequired
});

const InfoWithState = withState(Info);
export default InfoWithState;
