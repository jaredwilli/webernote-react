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
    let { items } = props || [];
    let { actions } = props;

    let width = props.width || 256;
    let desktop = props.desktop || true;
    let style = props.style || {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        float: 'left'
    };

    const handleClick = (e, item) => {
        let { secondary, command, action, options, url } = item.config;
        console.log('handleClick: ', secondary, command, action, options, url);

        if (action && action in actions) {
            action = actions[action];
        }
        console.log(action);


        debugger;
        if (item.config.url) {
            props.goToUrl(item.config.url);
        } else {
            // action();
        }
    }

    const buildMenuItem = (item, i) => {
        return <MenuItem key={i}
            primaryText={item.text}
            secondaryText={item.config.secondary}
            onClick={(e) => handleClick(e, item)} />
    }

    items = items.map((item, i) => {
        return (item.text === 'divider') ?
            <Divider key={i} /> :
            buildMenuItem(item, i)
    });

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
