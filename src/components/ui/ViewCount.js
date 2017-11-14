import React from 'react';
import FilterByNotebook from '../FilterByNotebook';

function ViewCount(props) {
    if (!props.notes || !props.notes.length ||
        !props.notebooks || !props.notebooks.length) {
        return <div className="empty hidden"></div>;
    }

    return (
        <span className="viewtext">
            Viewing <span className="count">{props.notes.length}</span>&nbsp;
            <span className="notes-from">notes from</span>

            <FilterByNotebook
                notes={props.notes}
                notebooks={props.notebooks}
                notebookFilter={props.notebookFilter}
                onChange={props.onChange} />
        </span>
    );
};

export default ViewCount;
