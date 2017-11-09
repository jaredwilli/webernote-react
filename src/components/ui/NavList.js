import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import FontAwesome from 'react-fontawesome';

class NavList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMenu: false
        };
    }

    state = {
		openMenu: false
	};

	handleToggle = () => {
		this.setState({
			openMenu: !this.state.open
		});
	};

	handleNestedListToggle = (item) => {
		this.setState({
			openMenu: item.state.openMenu
		});
	};

	render() {
        const { menuItems, type } = this.props;

        if (!menuItems) {
            return <div></div>;
        }

        const items = menuItems.forEach((item) => {
            <ListItem key={item.id}
                primaryText={item.name}
                onClick={item.onClick} />
        });

		return (
			<div className={type + '-nav nav-list'}>
                <List>
                    {items}
                    <ListItem
                        key={1}
                        primaryText={type}
                        leftIcon={<FontAwesome type={type} />}
                        openMenu={this.state.openMenu}
                        onNestedListToggle={this.handleNestedListToggle}
                        nestedItems={items}
                    />
                </List>
			</div>
		);
	}
}

export default NavList;
