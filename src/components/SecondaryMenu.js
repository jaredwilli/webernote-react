import React from 'react';
import Paper from 'material-ui/Paper';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const SecondaryMenu = ({ items = [], width = 256, desktop = true, ...props }) => {
    const style = props.style || {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
        float: 'left'
    };

    const handleClick = (e, item) => {
        const { secondary, command, action, options, url } = item.config;
        console.log('handleClick: ', secondary, command, action, options, url);

        if (action && action in props.actions) {
            console.log(props.actions[action]);
        }
        console.log(action);


        debugger;
        if (item.config.url) {
            props.goToUrl(item.config.url);
        } else {
            // action();
        }
    }

    items = items.map((item, i) => {
        return (item.text === 'divider') ?
            <Divider key={i} /> :
            <MenuItem key={i}
                primaryText={item.text}
                secondaryText={item.config.secondary}
                onClick={(e) => handleClick(e, item)} />
    });

    return (
        <div className="secondary-dropdown">
            <Paper style={style}>
                <Menu
                    desktop={desktop}
                    width={width}>
                    {items}
                </Menu>
            </Paper>
        </div>
    );
}

export default SecondaryMenu;
