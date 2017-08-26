import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import NotesContainer from './containers/notes.js';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NotesContainer />
            </Provider>
        );
    }
}

export default App;
