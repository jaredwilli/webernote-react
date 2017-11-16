import React from 'react';

import CloseBtn from './ui/CloseBtn';

const AddNotebook = (props) => {
    return (
        <span className="add-notebook">
            <input type="text" name="notebook"
                className="new-notebook"
                placeholder="Notebook name"
                onBlur={(e) => props.addNotebook(e)}
                onKeyDown={(e) => props.keyPress(e)} />

            {(props.notebooks && props.notebooks.length > 0) &&
                <CloseBtn onClick={(e) => props.toggleAddState(e)} />
            }
        </span>
    );
}

export default AddNotebook;
