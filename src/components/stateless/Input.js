import React, { Component } from 'react';

class Input extends Component {
    focus() {
        this.el.focus();
    }

    // Using refs to autofocus input
    // https://reactjs.org/docs/refs-and-the-dom.html
    render() {
        const { type = 'text' } = this.props;

        return (
            <input
                type={type}
                value={this.props.value}
                ref={el => { this.el = el; }}
                {...this.props} />
        );
    }
}

export default Input;
