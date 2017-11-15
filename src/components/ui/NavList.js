import React from 'react';

import FontAwesome from 'react-fontawesome';
import {noteNavItems} from '../../common/noteHelpers';

class NavList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandMenu: {
                notebooks: true,
                tags: true,
                labels: true
            }
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

    handleClick = (e, item) => {
        debugger;
    };

    toggleExpanded = (e, type) => {
        let current = {
            ...this.state.expandMenu
        };

        current[type] = !this.state.expandMenu[type];
        this.setState({
            current
        });
    }

	render() {
        const { notes, menuItems, type } = this.props;

        if (!menuItems) {
            return <div className="empty hidden"></div>;
        }

        return (
			<div className={type + '-nav'}>
                <ul className={type + ' top-nav-item'}>
                    <li className={(this.state.expandMenu[type]) ? 'expanded' : ''}>
                        <FontAwesome name="note" />
                        <div className="expandable" onClick={(e) => this.toggleExpanded(e, type)}>
                            {type}
                        </div>
                        <ul className={type}>
                            {noteNavItems({ [type]: menuItems }, notes)}
                        </ul>
                    </li>
                </ul>
            </div>
		);
	}
}

export default NavList;
