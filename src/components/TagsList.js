import React from 'react'

const TagsList = ({ tags = []}) => {
    tags = tags.map(tag =>
        <span key={tag.id} className="Select-value">
            <span className="Select-value-label" id={`react-select-2--value-${tag.id}`}>
                {tag.label}
            </span>
        </span>
    );

  return (
    <div className="Select tags Select--multi has-value">
        <span className="Select-multi-value-wrapper" id="react-select-2--value">
            {tags}
        </span>
    </div>
  )
}

export default TagsList;
