import React from 'react';
import reactCSS, { handleHover } from 'reactcss';
import { Swatch } from 'react-color/lib/components/common';

export const LabelSwatch = ({ hover, label, onClick, onSwatchHover }) => {
	const hoverSwatch = {
		position: 'relative',
		zIndex: '2',
		outline: '2px solid #fff',
		boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)'
	};

	const styles = reactCSS(
		{
			default: {
				swatch: {
					width: '45px',
					height: '45px',
					fontSize: '0'
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
				color={label.color}
				onClick={onClick(label)}
				onHover={onSwatchHover(label)}
				focusStyle={hoverSwatch}
			/>
		</div>
	);
};

export default handleHover(LabelSwatch);
