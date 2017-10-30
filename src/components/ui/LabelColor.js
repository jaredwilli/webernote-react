import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import {
	ColorWrap,
	EditableInput,
	Swatch
} from 'react-color/lib/components/common';
import color from 'react-color/lib/helpers/color';


export const LabelColor = (props) => {
	const styles = reactCSS(
		{
			default: {
				swatch: {
					borderRadius: '2px',
					margin: '0 3px 3px 0',
					width: '20px',
					height: '20px',
					float: 'left'
				}
            }
        }
	);

	const onSwatchHover = (swatch, e) => {
		let label = props.colors.filter(c => {
			return c.hex === swatch;
		})[0];

		color.isValidHex(label.hex) && props.onSwatchHover(label, e);
	};

	const handleChange = (val, e) => {
		color.isValidHex(val) && props.onChangeComplete({
            hex: val
        }, e);
	};

	return (
        <div className="swatches">
            {props.colors.map((c, i) => {
                return (
                    <Swatch className="swatch"
                        key={i}
                        color={c.hex}
                        hex={c.hex}
                        style={styles.swatch}
                        onClick={handleChange}
                        onHover={onSwatchHover}
                        focusStyle={{ boxShadow: `0 0 4px ${c.hex}` }}
                    />
                );
            })}
        </div>
	);
};

LabelColor.propTypes = {
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	triangle: PropTypes.oneOf(['hide', 'top-left', 'top-right']),
	colors: PropTypes.arrayOf(PropTypes.object)
};

LabelColor.defaultProps = {
	placeholder: 'Label name',
	triangle: 'top-left',
	width: 200,
	// http://htmlcolorcodes.com/color-chart/material-design-color-chart/
	colors: [
		{ name: 'red', hex: '#D50000' },
		{ name: 'light red', hex: '#FFCDD2' },
		{ name: 'light orange', hex: '#FFE0B2' },
		{ name: 'orange', hex: '#FB8C00' },
		{ name: 'dark orange', hex: '#FF5722' },
		{ name: 'light yellow', hex: '#FFF9C4' },
		{ name: 'yellow', hex: '#FFEB3B' },
		{ name: 'light green', hex: '#C8E6C9' },
		{ name: 'green', hex: '#64DD17' },
		{ name: 'dark green', hex: '#00C853' },
		{ name: 'light indigo', hex: '#C5CAE9' },
		{ name: 'indigo', hex: '#304FFE' },
		{ name: 'light blue', hex: '#81D4FA' },
		{ name: 'blue', hex: '#03A9F4' },
		{ name: 'dark blue', hex: '#2962FF' },
		{ name: 'cyan', hex: '#00BCD4' },
		{ name: 'light pink', hex: '#F8BBD0' },
		{ name: 'pink', hex: '#E91E63' },
		{ name: 'light purple', hex: '#E1BEE7' },
		{ name: 'purple', hex: '#9C27B0' },
		{ name: 'light gray', hex: '#F5F5F5' },
		{ name: 'gray', hex: '#9E9E9E' },
		{ name: 'dark gray', hex: '#212121' }
	]
};

export default ColorWrap(LabelColor);
