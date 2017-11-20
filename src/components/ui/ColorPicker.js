import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { ColorWrap } from 'react-color/lib/components/common'
import ColorSwatch from './ColorSwatch'

export const ColorPicker = ({ width, colors, onChangeComplete, onSwatchHover, triangle,
    className = '' }) => {

    const styles = reactCSS({
        'default': {
            card: {
                width,
                background: '#fff',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                boxShadow: '0 3px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '2px',
                display: 'flex',
                flexWrap: 'wrap',
                position: 'relative',
                padding: '5px',
            },
            triangle: {
                border: '7px solid transparent',
                borderBottomColor: '#fff',
                position: 'absolute',
            },
            triangleShadow: {
                border: '8px solid transparent',
                borderBottomColor: 'rgba(0,0,0,0.15)',
                position: 'absolute',
            },
        },
        'hide-triangle': {
            triangle: {
                display: 'none',
            },
            triangleShadow: {
                display: 'none',
            },
        },
        'top-left-triangle': {
            triangle: {
                top: '-14px',
                left: '10px',
            },
            triangleShadow: {
                top: '-16px',
                left: '9px',
            },
        },
        'top-right-triangle': {
            triangle: {
                top: '-14px',
                right: '10px',
            },
            triangleShadow: {
                top: '-16px',
                right: '9px',
            },
        },
        'bottom-left-triangle': {
            triangle: {
                top: '35px',
                left: '10px',
                transform: 'rotate(180deg)',
            },
            triangleShadow: {
                top: '37px',
                left: '9px',
                transform: 'rotate(180deg)',
            },
        },
        'bottom-right-triangle': {
            triangle: {
                top: '35px',
                right: '10px',
                transform: 'rotate(180deg)',
            },
            triangleShadow: {
                top: '37px',
                right: '9px',
                transform: 'rotate(180deg)',
            },
        },
    }, {
        'hide-triangle': triangle === 'hide',
        'top-left-triangle': triangle === 'top-left',
        'top-right-triangle': triangle === 'top-right',
        'bottom-left-triangle': triangle === 'bottom-left',
        'bottom-right-triangle': triangle === 'bottom-right',
    });

    const handleChange = (hex, e) => onChangeComplete({ hex, source: 'hex' }, e);

    return (
        <div style={styles.card} className={`color-picker ${className}`}>
        <div style={styles.triangleShadow} />
        <div style={styles.triangle} />
            {colors.map(color => (
                <ColorSwatch
                    color={color}
                    key={color}
                    onClick={handleChange}
                    onSwatchHover={onSwatchHover}
                />
            ))}
        </div>
    );
};

ColorPicker.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    colors: PropTypes.arrayOf(PropTypes.string),
    triangle: PropTypes.oneOf([
        'hide', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    ]),
};

ColorPicker.defaultProps = {
    triangle: 'top-left',
    width: 150,
    colors: [
        '#B80000', '#DB3E00', '#FCCB00', '#008B02',
        '#006B76', '#1273DE', '#004DCF', '#5300EB',
        '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5',
        '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'
    ],
};

export default ColorWrap(ColorPicker);
