import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

function SecondaryMenu(props) {
    let actions = Object.assign({}, props.noteActions, props.notebookActions, props.tagActions, props.labelActions);

    let items = props.items || [];
    let width = props.width || 256;
    let desktop = props.desktop || true;
    let style = props.style || {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        float: 'left'
    };

    items = items.map((m, v) =>
        (m.text === 'divider') ?
            <Divider key={v} /> :
            <MenuItem key={v} primaryText={m.text} secondaryText={m.secondary} />
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
