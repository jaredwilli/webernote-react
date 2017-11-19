import React from 'react';
import Button from './Button';

const LoginButtons = ({ props }) => {
    return (
        <div className="modal-body login-with btn-group">
            <Button onClick={() => props.login('fbProvider')}
                className="facebook">
                <i className="fa fa-facebook"></i>
                <span className="btn-text">Sign in with Facebook</span>
            </Button>
            <Button onClick={() => props.login('gProvider')}
                className="google">
                <i className="fa fa-google"></i>
                <span className="btn-text">Sign in with Google</span>
            </Button>
            <Button onClick={() => props.login('twProvider')}
                className="twitter">
                <i className="fa fa-twitter"></i>
                <span className="btn-text">Sign in with Twitter</span>
            </Button>
            <Button onClick={() => props.login('ghProvider')}
                className="github">
                <i className="fa fa-github"></i>
                <span className="btn-text">Sign in with Github</span>
            </Button>
        </div>
    );
}

export default LoginButtons;
