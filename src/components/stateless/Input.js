import React from 'react'

class Input extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: 'text'
        };
    }

    componentWillReceiveProps(nextProps, b) {
        if (nextProps.type !== this.state.type) {
            this.setState({ type: nextProps.type });
        }
    }

    focus() {
        this.el.focus();
    }

    // Using refs to autofocus input
    // https://reactjs.org/docs/refs-and-the-dom.html

    render() {
        return (
            <input
                type={this.state.type}
                value={this.props.value}
                ref={el=> { this.el = el; }}
                {...this.props} />
        );
    }
}

export default Input;
