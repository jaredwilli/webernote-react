import React from 'react';
import Paper from 'material-ui/Paper';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

function SecondaryMenu(props) {
    let { actions } = props;

    let items = props.items || [];
    let width = props.width || 256;
    let desktop = props.desktop || true;
    let style = props.style || {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        float: 'left'
    };

    const performAction = (e, action) => {
        console.log('performAction: ', action);

        if (action.url) {
            props.goToUrl(action.url);
        } else {
            action();
        }
    }

    const buildMenuItem = (item, v) => {
        let action = null;

        if (item.action && item.action in actions) {
            action = actions[item.action];
        }

        if (item.url) {
            action = { url: item.url };
        }

        return <MenuItem key={v}
            primaryText={item.text}
            secondaryText={item.secondary}
            onClick={(e) => performAction(e, action)} />
    }

    items = items.map((item, v) =>
        (item.text === 'divider') ?
            <Divider key={v} /> :
            buildMenuItem(item, v)
    );

    return (
        <div className="secondary-dropdown">
            <Paper style={style}>
                <Menu desktop={desktop} width={width}>
                    {items}
                </Menu>
            </Paper>
        </div>
    );
}

export default SecondaryMenu;
