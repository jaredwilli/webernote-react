import React from 'react';
import Input from './stateless/Input';
import CloseBtn from './stateless/CloseBtn';

const AddNotebook = ({ notebooks = [], ...props }) => {
    return (
       <span className="add-notebook">
            <Input
                type="text"
                name="notebook"
                className="new-notebook"
                placeholder="Notebook name"
                onBlur={(e) => props.addNotebook(e)}
                onKeyDown={(e) => props.keyPress(e)} />

           {notebooks.length > 0 && <CloseBtn onClick={(e) => props.toggleAddState(e)} />}
       </span>
   );
}

export default AddNotebook;
