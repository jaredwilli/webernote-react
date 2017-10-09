import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TwitterPicker } from 'react-color';
import { COLORS } from '../constants/noteConst';
import * as labelActions from '../actions/labelActions';

class LabelsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.showColorPicker = this.showColorPicker.bind(this);
        this.editLabel = this.editLabel.bind(this);
        this.handleClose = this.handleClose.bind(this);

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

    editLabel(color) {
        const labels = this.props.labels;
        let labelExists = [];

        this.setState({
            displayColorPicker: false
        });

        if (color) {
            let label = color;

            COLORS.forEach((c) => {
                if (c.hex === label.hex) {
                    label.name = c.name;
                }
            });

            if (labels) {
                labelExists = labels.filter((l) => {
                    return l.hex === color.hex;
                });
            }

            if (!labelExists.length) {
                this.props.actions.addLabel(label);
            } else {
                label = labelExists[0];
            }

            this.props.editLabel(label);
        }
    }

    render() {
        const selectedNote = this.props.selectedNote;
        let backgroundColor = 'none';
        let colorPicker = '';
        let colors = [];

        COLORS.forEach((c) => {
            colors.push(c.hex);
        });

        if (selectedNote.label) {
            backgroundColor = selectedNote.label.hex;
        }

        if (this.state.displayColorPicker) {
            colorPicker = (
                <div className="label-color-picker">
                    <div className="cover" onClick={this.handleClose} />
                    <TwitterPicker color={this.state.background}
                        onChangeComplete={this.editLabel}
                        colors={colors}
                        triangle="top-right" />
                </div>
            );
        }

        return (
            <div className="label-picker">
                <label onClick={this.showColorPicker}>Label</label>
                <button className="label-background"
                    style={{background: backgroundColor}}
                    onClick={this.showColorPicker}>
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LabelsContainer);
