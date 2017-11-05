import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedNotebook } from '../common/noteHelpers';

FilterByNotebook.propTypes = {
    notebookFilter: PropTypes.string,
    notebooks: PropTypes.array,
    count: PropTypes.number,
    filterNotes: PropTypes.func
};

const selectedNotebook = (e, notebooks) => getSelectedNotebook(e.target, notebooks);

// TODO: refactor the notebooks dropdown
function FilterByNotebook({ notebookFilter, notebooks, count, filterNotes }) {
    if (!notebooks) {
        return <div className="no-notebooks"></div>
    }

    const notebookOptions = notebooks.map((notebook) =>
        <option key={notebook.id} value={notebook.id}>{notebook.name}</option>
    );

    return (
        <div className="filter-notebook">
            {(notebooks) &&
                <div className="viewing">
                    <span className="viewtext">
                        Viewing <span className="count">{count}</span> notes from
                    </span>

                    <select name="notebookFilter" className="notebook-filter"
                        value={notebookFilter}
                        onChange={filterNotes}>
                        <option>Select notebook</option>
                        {notebookOptions}
                    </select>
                </div>
            }
        </div>
    );
};

export default FilterByNotebook;
