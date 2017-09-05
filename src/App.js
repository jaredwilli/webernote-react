import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/index.js';
import NotesContainer from './containers/notesContainer.js';

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
