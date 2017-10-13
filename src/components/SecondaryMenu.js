import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

function SecondaryMenu(props) {
    let items = props.items || [];
    let width = props.width || 256;
    let desktop = props.desktop || true;
    let style = props.style || {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        float: 'left'
    };

    items = items.map((m) =>
        (m.text === 'divider') ?
            <Divider /> :
            <MenuItem key={m.text} primaryText={m.text} secondaryText={m.secondary} />
    );

    return (
        <div>
            <Paper style={style}>
                <Menu desktop={desktop} width={width}>
                    {items}
                </Menu>
            </Paper>
        </div>
    );
}

export default SecondaryMenu;
