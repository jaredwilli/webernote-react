import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

function FloatingButton(props) {
    let mini = props.mini || false;
    let secondary = props.secondary || false;
    let disabled = props.disabled || false;
    let style = props.style || {};

    return (
        <div className={props.class}>
            <FloatingActionButton onClick={(e) => props.click(e)}
                mini={mini}
                secondary={secondary}
                disabled={disabled}
                style={style}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
    );
}

export default FloatingButton;
