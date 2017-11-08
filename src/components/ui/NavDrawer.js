import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import HambyBtn from './HambyBtn';
import CloseBtn from './CloseBtn';

class NavDrawer extends React.Component {
	constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);

		this.state = {
            openDrawer: false
        };
	}

	handleToggle() {
        this.setState({
            openDrawer: !this.state.openDrawer
        });
    }

	handleClose = () => this.setState({
        openDrawer: false
    });

	render() {
        return (
			<div className="nav-drawer">
                <HambyBtn onClick={this.handleToggle} />

				<Drawer
					docked={false}
					width={200}
					open={this.state.openDrawer}
					onRequestChange={openDrawer => this.setState({ openDrawer })}>

                    <CloseBtn onClick={this.handleClose} />

					<MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
					<MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
				</Drawer>
			</div>
		);
	}
}

export default NavDrawer;
