import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const DropDown = ({ value = 1, items = [], className = 'drodown', autowidth = false, ...props }) => {
	const styles = props.styles || {
        width: 200
    };

    return (
        <DropDownMenu
            value={value}
            style={styles}
            autoWidth={autowidth}
            onChange={(e) => props.onChange(e)}>
            {items.map(item =>
                <MenuItem
                    key={item.value}
                    value={item.value}
                    primaryText={item.text} />
            )}
        </DropDownMenu>
    );
}

export default DropDown;
