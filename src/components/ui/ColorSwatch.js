import React from 'react';
import reactCSS, { handleHover } from 'reactcss';

import { Swatch } from 'react-color/lib/components/common';

export const ColorSwatch = ({ color, hover, onClick, onSwatchHover }) => {
	const hoverSwatch = {
		boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.25)',
		outline: '2px solid #fff',
		position: 'relative',
		zIndex: '2',
	};

	const styles = reactCSS(
		{
			default: {
				swatch: {
					fontSize: '0',
					width: '22px',
					height: '22px',
				}
			},
			hover: {
				swatch: hoverSwatch
			}
		},
		{ hover }
	);

	return (
		<div style={styles.swatch}>
			<Swatch
				color={color}
				onClick={onClick}
				onHover={onSwatchHover}
				focusStyle={hoverSwatch} />
		</div>
	);
};

export default handleHover(ColorSwatch);
