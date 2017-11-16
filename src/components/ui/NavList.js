import React from 'react';

import FontAwesome from 'react-fontawesome';
import NavListItem from './NavListItem';

class NavList extends React.Component {
    constructor(props) {
        super(props);

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            expandMenu: {
                notebooks: true,
                tags: true,
                labels: true
            }
        };
    }


	handleClick(e, item) {
        // debugger;
    };

    toggleExpanded(e, type) {
        let current = {
            ...this.state.expandMenu
        };

        current[type] = !this.state.expandMenu[type];

        this.setState({
            expandMenu: current
        });
    }

	render() {
        const { notes, items, type } = this.props;

        if (!items) {
            return <div className="empty hidden"></div>;
        }

        return (
			<div className={type + '-nav'}>
                <ul className={type + ' top-nav-item'}>
                    <li className={(this.state.expandMenu[type]) ? 'expanded' : ''}>

                        <FontAwesome name="times" />

                        <div className="expandable"
                            onClick={(e) => this.toggleExpanded(e, type)}>
                            {type}
                        </div>

                        <NavListItem
                            items={items}
                            notes={notes}
                            type={type} />
                    </li>
                </ul>
            </div>
		);
	}
}

export default NavList;

