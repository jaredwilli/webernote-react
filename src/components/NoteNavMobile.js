import React from 'react';
import PropTypes from 'prop-types';

NoteNavMobile.propTypes = {
    show: PropTypes.bool,
    toggleDrawer: PropTypes.func,
    coverStyles: PropTypes.object

};

const NoteNavMobile = (props) => {
    let coverStyles = { display: 'none' };
    let drawerMenuStyles = {};

    if (props.drawerOpen) {
        coverStyles = { display: 'inline-block' };
        drawerMenuStyles = { left: '-15px' };
    }

    return (
        <div className="narrow-nav drawer-nav">
            <div className="cover" onClick={props.toggleDrawer} style={coverStyles} />

            <nav className="nav-col note-nav" style={drawerMenuStyles}>
                {props.state.drawerOpen && <CloseBtn onClick={props.setState({ drawerOpen: false })} />}

                {(notebooks && notebooks.length > 0) &&
                    <div className="notebooks-nav">
                        <ul className="notebooks top-nav-item">
                            <li className={(props.state.expandNotebooks) ? 'expanded' : ''}>
                                <div className="expandNotebooks" onClick={props.toggleExpanded}>
                                    Notebooks
                                </div>
                                <ul className="notebooks-list">
                                    {noteNavItems({ notebook: notebooks }, notes)}
                                </ul>
                            </li>
                        </ul>
                    </div>
                }

                {(tags && tags.length > 0) &&
                    <div className="tags-nav">
                        <ul className="tags top-nav-item">
                            <li className={(props.state.expandTags) ? 'expanded' : ''}>
                                <div className="expandTags" onClick={props.toggleExpanded}>Tags</div>
                                <ul className="tags">
                                    {noteNavItems({ tags }, notes)}
                                </ul>
                            </li>
                        </ul>
                    </div>
                }

                {(labels && labels.length > 0) &&
                    <div className="labels-nav">
                        <ul className="labels top-nav-item">
                            <li className={(props.state.expandLabels) ? 'expanded' : ''}>
                                <div className="expandLabels" onClick={props.toggleExpanded}>Labels</div>
                                <ul className="labels">
                                    {noteNavItems({ label: labels }, notes)}
                                </ul>
                            </li>
                        </ul>
                    </div>
                }
            </nav>
        </div>
    );
};

export default NoteNavMobile;
