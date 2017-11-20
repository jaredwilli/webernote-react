import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ColorPicker } from './ui/ColorPicker';
// import Circle from 'react-color'
import Cover from './stateless/Cover';
import Button from './stateless/Button';
import CloseBtn from './stateless/CloseBtn';

import { COLORS } from '../constants/colors';
import * as labelActions from '../actions/labelActions';

class LabelPicker extends React.Component {
    constructor(props) {
        super(props);

        this.editLabel = this.editLabel.bind(this);
        this.removeLabel = this.removeLabel.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showColorPicker = this.showColorPicker.bind(this);

        this.state = {
            displayColorPicker: false
        };
    }

    handleClose() {
        this.setState({
            displayColorPicker: false
        });
    }

    showColorPicker(e) {
        e.preventDefault();
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }

    // TODO: Need to make this work and remove labels
    removeLabel(e) {
        e.preventDefault();
        this.props.editField({});
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
        } else {
            label = labelExists;
        }

        this.props.editField(label);
        this.props.actions.getLabels();
    }

    render() {
        const colors = COLORS.map(color => color.hex);
        const { selectedNote } = this.props;
        let backgroundColor = 'none';
        let colorPicker = '';

        if (selectedNote.label) {
            backgroundColor = selectedNote.label.hex;
        }

        // FIXME: make this a popover reusable component
        if (this.state.displayColorPicker) {
            colorPicker = (
                <div className="label-color-picker">
                    <Cover
                        onClick={this.handleClose}
                        isActive={this.state.displayColorPicker} />

                    {/* <Circle
                        colors={colors}
                        triangle="top-right"
                        color={this.state.background}
                        onChangeComplete={this.editLabel} /> */}
                    <ColorPicker
                        colors={colors}
                        triangle="top-right"
                        color={this.state.background}
                        onChangeComplete={this.editLabel} />
                </div>
            );
        }

        return (
            <div className="label-picker">
                <Button
                    className="label-background"
                    style={{ background: backgroundColor }}
                    onClick={this.showColorPicker}>
                    {(backgroundColor === 'none') ? 'Color' : ''}
                </Button>

                {(backgroundColor !== 'none') && <CloseBtn onClick={this.removeLabel} />}

                {colorPicker}
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
