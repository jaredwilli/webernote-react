import React from 'react';
import PropTypes from 'prop-types';

import UserPhoto from '../components/UserPhoto';
import IconBtn from '../components/ui/IconBtn';

LoginOut.propTypes = {
    user: PropTypes.object,
    showLoginModal: PropTypes.func,
    goToGithub: PropTypes.func,
    logout: PropTypes.func,
    login: PropTypes.func
};

function LoginOut({ user = {}, ...props }) {
    let avatarStyle = { border: '1px solid rgba(51, 51, 51, 0.50)' };
    let iconBtnStyle = { verticalAlign: 'bottom' };
    let userMenu = '';

    if (!user.isAnonymous) {
        userMenu = (
            <div className="user-menu">
                <IconBtn iconClass="github"
                    onclick={props.goToGithub}
                    style={iconBtnStyle} />

                <span className="user-meta">
                    <UserPhoto imgSrc={user.photo}
                        style={avatarStyle}
                        size={20} />
                    <span className="username">
                        {user.displayName}
                    </span>
                </span>
                <button className="logout"
                    onClick={props.logout}>
                    Logout
                </button>
            </div>
        );
    } else {
        userMenu = (
            <div className="loginout">
                <div className="user-menu">
                    <IconBtn iconClass="github"
                        onclick={props.goToGithub}
                        style={iconBtnStyle} />

                    <div className="user-meta">
                        <UserPhoto
                            style={avatarStyle}
                            size={20} />
                        <span className="username">
                            {user.displayName}
                        </span>
                    </div>
                    <button className="login"
                        onClick={props.showLoginModal}>
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="loginout">
            {userMenu}
        </div>
    );
}

export default LoginOut;
