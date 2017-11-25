import React from 'react';
import reactCSS, { handleHover } from 'reactcss';

import { Swatch } from 'react-color/lib/components/common';

export const ColorSwatch = ({ color, hover, onClick, onSwatchHover }) => {
	const hoverSwatch = {
		outline: '2px solid #fff',
		position: 'relative',
		zIndex: '2',
	};

	const styles = reactCSS(
		{
			default: {
				swatch: {
                    fontSize: '0',
                    padding: '2px'
				},
                palette: {
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px'
                }
            },
			hover: {
				swatch: hoverSwatch
			}
		},
		{ hover }
	);

	return (
		<div className="swatch" style={styles.swatch}>
			<Swatch
				color={color}
				onClick={onClick}
				onHover={onSwatchHover}
                style={styles.palette}
				focusStyle={hoverSwatch} />
		</div>
	);
};

export default handleHover(ColorSwatch);
