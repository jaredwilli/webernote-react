import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { ColorPicker } from '../components/ui/ColorPicker';
import CloseBtn from '../components/ui/CloseBtn';

import { COLORS } from '../constants/noteConst';

import * as labelActions from '../actions/labelActions';

class LabelsContainer extends React.PureComponent {
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
        this.props.removeLabel({});
    }

    editLabel(label) {
        const { labels } = this.props;
        let labelExists = [];
        label = COLORS.filter((color) => color.hex.toLowerCase() === label.hex.toLowerCase())[0];

        this.setState({
            displayColorPicker: false
        });

        if (label) {
            if (labels) {
                labelExists = labels.filter((l) => l.hex === label.hex);
            }

            if (!labelExists.length) {
                this.props.actions.addLabel(label);
            } else {
                label = labelExists[0];
            }

            this.props.editField(label);
            this.props.actions.getLabels();
        }
    }

    render() {
        const { selectedNote } = this.props;
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

                    <ColorPicker color={this.state.background}
                        onChangeComplete={this.editLabel}
                        colors={colors}
                        triangle="top-right" />
                </div>
            );
        }

        return (
            <div className="label-picker">
                <button className="label-background" type="button"
                style={{ background: backgroundColor }}
                    onClick={this.showColorPicker}>
                    {(backgroundColor === 'none') ? 'Color' : ''}
                </button>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LabelsContainer));
