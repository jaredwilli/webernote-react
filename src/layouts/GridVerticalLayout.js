import React from 'react';

/**
 * @name GridVerticalLayout
 *
 * @description A generic 3-column flexbox vertical grid layout that takes 3 commponents as props and outputs the composed component
 */
class GridVerticalLayout extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

	render() {
        const { leftCol, middleCol, rightCol, ...props } = this.props;

        return (
            <FlexVerticalGrid>
                <div className="left-column">{ leftCol }</div>
                <div className="middle-column">{ middleCol }</div>
                <div className="right-column">{ rightCol }</div>
            </FlexVerticalGrid>
        );
	}
}

export default GridVerticalLayout;
