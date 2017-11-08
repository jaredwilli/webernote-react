import React from 'react';

function LoginButtons(props) {
    return (
        <div className="modal-body login-with btn-group">
            <button onClick={() => props.login('fbProvider')}
                className="facebook">
                <i className="fa fa-facebook"></i>
                <span className="btn-text">Sign in with Facebook</span>
            </button>
            <button onClick={() => props.login('gProvider')}
                className="google">
                <i className="fa fa-google"></i>
                <span className="btn-text">Sign in with Google</span>
            </button>
            <button onClick={() => props.login('twProvider')}
                className="twitter">
                <i className="fa fa-twitter"></i>
                <span className="btn-text">Sign in with Twitter</span>
            </button>
            <button onClick={() => props.login('ghProvider')}
                className="github">
                <i className="fa fa-github"></i>
                <span className="btn-text">Sign in with Github</span>
            </button>
        </div>
    );
}

export default LoginButtons;
