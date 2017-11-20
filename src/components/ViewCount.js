import React from 'react';
import FilterByNotebook from './FilterByNotebook'

const ViewCount = ({ notes = [], notebooks = [], ...props }) => {
    if (!notes.length || !notebooks.length) {
        return <div className="empty hidden"></div>;
    }

    return (
        <span className="viewtext">
            Viewing <span className="count">{notes.length}</span>&nbsp;
            <span className="notes-from">notes from</span>

            <FilterByNotebook
                notes={notes}
                notebooks={notebooks}
                notebookFilter={props.notebookFilter}
                onChange={props.onChange} />
        </span>
    );
};

export default ViewCount;
