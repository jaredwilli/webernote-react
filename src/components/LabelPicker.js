import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ColorPicker } from './ui/ColorPicker';
import Cover from './stateless/Cover';
import Button from './stateless/Button';
import CloseBtn from './stateless/CloseBtn';

import { COLORS } from '../constants/colors';
import * as labelActions from '../actions/labelActions';

class LabelPicker extends React.Component {
    constructor(props) {
        super(props);

        this.editLabel = this.editLabel.bind(this);
        this.deleteNoteLabel = this.deleteNoteLabel.bind(this);
        this.toggleColorPicker = this.toggleColorPicker.bind(this);

        this.state = {
            displayColorPicker: false
        };
    }

    toggleColorPicker() {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }

    // TODO: Need to make this work and remove labels
    deleteNoteLabel() {
        this.props.deleteNoteLabel(this.props.selectedNote);
        this.props.actions.removeLabel();
    }

    editLabel(label) {
        label = COLORS.find(color => color.hex.toLowerCase() === label.hex.toLowerCase());

        const { labels = [] } = this.props;
        const labelExists = (labels.length) ? labels.find((l) => l.hex === label.hex) : false;

        this.setState({
            displayColorPicker: false
        });

        if (!labelExists) {
            this.props.actions.addLabel(label);
            this.props.actions.getLabels();
        } else {
            label = labelExists;
        }

        this.props.editField(label);
        this.props.actions.getLabels();
    }

    render() {
        const colors = COLORS.map(color => color.hex);
        const { selectedNote } = this.props;
        const { background, displayColorPicker } = this.state;
        let backgroundColor = 'none';

        if (selectedNote.label) {
            backgroundColor = selectedNote.label.hex;
        }

        return (
            <div className="label-picker">
                <Button
                    className="label-background"
                    style={{ background: backgroundColor }}
                    onClick={this.toggleColorPicker}>
                    {(backgroundColor === 'none') ? 'Color' : ''}
                </Button>

                {(backgroundColor !== 'none') && <CloseBtn onClick={this.deleteNoteLabel} />}

                {(this.state.displayColorPicker) &&
                    <div className="label-color-picker">
                        <Cover onClick={() => this.toggleColorPicker()}
                            isActive={displayColorPicker} />

                        <ColorPicker
                            colors={colors}
                            triangle="top-right"
                            color={background}
                            onChangeComplete={this.editLabel} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        labels: state.labelData.labels,
        selectedNote: state.noteData.selectedNote
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(labelActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelPicker));
