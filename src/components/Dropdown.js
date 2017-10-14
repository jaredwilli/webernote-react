import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

function DropDown(props) {
	let value = props.value || 1;
    let items = '';
    let onchange = props.onchange;
    let autowidth = props.autowidth || false;
    let styles = props.styles || {
        width: 200
    };

    if (props.items && props.items.length) {
        props.items.map((item) =>
            items += <MenuItem key={item.value} value={item.value} primaryText={item.text} />
        );
    }

    return (
        <div>
            <DropDownMenu
                value={value}
                onChange={onchange}
                style={styles}
                autoWidth={autowidth}>
                <MenuItem value={1} primaryText="Custom width" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
                <MenuItem value={5} primaryText="Weekly" />
            </DropDownMenu>
        </div>
    );
}

export default DropDown;
