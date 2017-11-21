import React, { Component } from 'react'

function ConnectContainer(ChildComponentClass, mapStateToProps) {
    return class Container extends Component {
        render() {
            const { state } = this.context.store.getState();

            const props = mapStateToProps(state);

            return <ChildComponentClass {...this.props} {...props} />;
        }
    }
}

export default ConnectContainer
