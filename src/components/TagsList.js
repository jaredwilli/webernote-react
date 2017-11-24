import React from 'react';
import PropTypes from 'prop-types';

const TagsList = ({ tags }) => {
    return (
        <div className="Select tags Select--multi has-value">
            <span id="react-select-2--value"
                className="Select-multi-value-wrapper">
                {(tags && tags.length > 0) && tags.map(tag =>
                    <span key={tag.id} className="Select-value">
                        <span id={`react-select-2--value-${tag.id}`}
                            className="Select-value-label">
                            {tag.label}
                        </span>
                    </span>
                )}
            </span>
        </div>
    );
};

TagsList.propTypes = {
    tags: PropTypes.array
};

export default TagsList;
