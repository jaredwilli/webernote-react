import React from 'react';

import '../styles/welcome-msg.css';

const WelcomeMsg = (props) => {
    return (
        <div className="zero-notes">
            <div className="welcome-msg">
                <h2>Welcome to Webernote!</h2>
                <sub>A real-time data syncing application</sub>
                <p>Webernote allows you to create notes and store them instantly in real time. There are various ways to organize your notes. Currently you are able to:</p>

                <ul>
                    <li>create, edit, and delete notes</li>
                    <li>create notebooks and add notes to them</li>
                    <li>select or use a custom colored label to color-code your notes</li>
                    <li>create and select custom tags to assign to notes</li>
                    <li>Plus, mobile-friendly design allows you to take notes anywhere!!</li>
                </ul>

                <p>Making changes to your notes is a snap. Everything is instantly saved as you do it. <br/> You don't have to create an account to try it out, just click the Add Note button. Later if you choose to keep using the app login with your Facebook account. Everything you've added will be added to your user account.</p>

                <div className="get-started">
                    <button onClick={props.addNote} className="get-started-btn">
                        <i className="fa fa-file-text"></i>
                        Create A New Note
                    </button>

                    <button onClick={props.login} className="facebook get-started-btn">
                        <i className="fa fa-facebook"></i>
                        Login With Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMsg;
