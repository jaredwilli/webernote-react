import React from 'react';
import PropTypes from 'prop-types';

import Input from './stateless/Input';
import CloseBtn from './stateless/CloseBtn';

const AddNotebook = ({ notebooks = [], ...props }) => {
    return (
       <span className="add-notebook">
            <Input
                name="notebook"
                className="new-notebook"
                placeholder="Notebook name"
                onBlur={event => props.addNotebook(event)}
                onKeyDown={event => props.keyPress(event)} />

           {(notebooks.length > 0) && <CloseBtn onClick={event => props.toggleAddState(event)} />}
       </span>
   );
}

AddNotebook.propTypes = {
    notebooks: PropTypes.array.isRequired,
    addNotebook: PropTypes.func.isRequired,
    keyPress: PropTypes.func.isRequired,
    toggleAddState: PropTypes.func
};

export default AddNotebook;
