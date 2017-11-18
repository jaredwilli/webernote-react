import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const WelcomeMsg = ({ ...props }) => {
    return (
        <div className="zero-notes">
            <div className="welcome-msg">
                <h2>Welcome to Webernote!</h2>
                <sub>A real-time data syncing application</sub>
                <p>Webernote allows you to create notes and store them instantly in real time. There are various ways to organize your notes. Currently you are able to:</p>

                <ul>
                    <li>Create, edit, and delete notes,</li>
                    <li>Create notebooks and add notes to them,</li>
                    <li>Select or use a custom colored label to color-code your notes,</li>
                    <li>Create and select custom tags to assign to notes,</li>
                    <li>Plus, mobile-friendly design allows you to take notes anywhere!!</li>
                </ul>

                <p>You don't have to create an account to try it out, just click the Add Note button and start typing in the form. Later if you choose to keep using the app login with your Facebook account. Everything you've added will be added to your user account.</p>

                <div className="get-started btn-group">
                    <Button
                        onClick={props.addNote}
                        className="create-note get-started-btn">
                        <i className="fa fa-file-text"></i>
                        Create A New Note
                    </Button>

                    <Button
                        onClick={props.showLoginModal}
                        className="login get-started-btn">
                        <i className="fa fa-sign-in"></i>
                        Login / Register
                    </Button>
                </div>
            </div>
        </div>
    );
};

WelcomeMsg.propTypes = {
    addNote: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired
};

export default WelcomeMsg;
