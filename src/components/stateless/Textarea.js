import React from 'react';

const Textarea = ({ ...props }) => (
	<textarea
		value={props.value}
		onChange={e => props.onChange(e)}
		{...props}
	/>
);

export default Textarea;
