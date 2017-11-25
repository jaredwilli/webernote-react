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
		const { type = '', notes = [], items = [] } = this.props;

		if (!items.length) {
			return <div className="empty hidden" />;
		}

        // Filter out notes with the property type
        const notesWithType = notes.filter((note) => note.hasOwnProperty(type));


		return (
			<div className={`${type}-nav`}>
				<ul className={`${type} top-nav-item`}>
					<li className={this.state.expandMenu[type] ? 'expanded' : ''}>
						<FontAwesome name="book" />

                        <Expandable onClick={this.toggleExpanded} type={type} />

						<NavListItem type={type} notes={notesWithType} items={items} />
					</li>
				</ul>
			</div>
		);
	}
}

export default NavList;
