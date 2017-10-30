import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { LabelColor } from '../components/ui/LabelColor';
import CloseBtn from '../components/ui/CloseBtn';

import { COLORS } from '../constants/noteConst';
import * as labelActions from '../actions/labelActions';

class LabelsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.toggleColorPicker = this.toggleColorPicker.bind(this);
        this.editLabel = this.editLabel.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onSwatchHover = this.onSwatchHover.bind(this);
        this.removeLabel = this.removeLabel.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            displayColorPicker: false,
            label: {
                customName: '',
                name: '',
                hex: null
            }
        };
    }

    handleClose() {
        this.setState({
            displayColorPicker: false
        });
    }

    toggleColorPicker(e) {
        e.preventDefault();

        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }

    removeLabel(e) {
        e.preventDefault();
        const label = {};
        this.props.editField(label);
    }

    onSwatchHover(label, e) {
        debugger;
        this.setState({
            label: {
                name: label.name,
                hex: label.hex
            }
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        }, () => {
            debugger;
        });
    }

    editLabel(label) {
        label = COLORS.filter((color) => color.hex === label.hex)[0];
        console.log(label);

        if (label.name && !label.hex) {
            this.setState({ label: { name: label.name }});
            return;
        }

        const labels = this.props.labels;
        let labelExists = [];

        this.setState({
            displayColorPicker: false,
            label: {
                name: label.name,
                hex: label.hex
            }
        });

        if (label) {
            if (labels) {
                labelExists = labels.filter((l) => {
                    return l.hex === label.hex;
                });
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
        const selectedNote = this.props.selectedNote;
        let labelName = '';
        let backgroundColor = 'none';
        let colorPicker = '';

        if (this.state.displayColorPicker) {
            colorPicker = (
                <div className="label-color-picker">
                    <div className="cover" onClick={this.handleClose} />

                    <div className="card label-color">
                        <div className="triangle-shadow" />
                        <div className="triangle" />

                        <LabelColor color={selectedNote.label.hex}
                            colors={COLORS}
                            onChangeComplete={this.editLabel}
                            onSwatchHover={this.onSwatchHover}
                            name={this.state.label.name}
                            triangle="top-right" />

                        <input type="text" className="label-name"
                            placeholder="Label name"
                            value={selectedNote.label.name}
                            onChange={this.handleNameChange} />
                    </div>
                </div>
            );
        }

        return (
            <div className="label-picker">
                <button className="label-background" type="button"
                    style={{ background: selectedNote.label.hex }}
                    onClick={this.toggleColorPicker} />

                <CloseBtn onClick={this.removeLabel} />

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
