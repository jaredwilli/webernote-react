import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../stateless/Button';
import IconBtn from '../../stateless/IconBtn';
import UserPhoto from '../../UserPhoto';

import { URLS } from '../../../constants/menu';

const LoginOut = ({ match, user = {}, ...props }) => {
    return (
        <div className="loginout">
            <div className="user-menu">
                <IconBtn
                    iconClass="github"
                    onclick={() => props.goToUrl(URLS.GITHUB_REPO)} />

                <span className="user-meta">
                    <UserPhoto
                        size={20}
                        style={{ border: '1px solid rgba(51, 51, 51, 0.50)' }}
                        imgSrc={user.photo} />

                    <span className="username">
                        <Link to={`${match.path}/${user.uid}`}>
                            {user.displayName}
                        </Link>
                    </span>
                </span>

                {(!user.isAnonymous) && <Button className="logout" onClick={event => props.logout(event)}>Logout</Button>}

                {(user.isAnonymous) && <Button className="login" onClick={event => props.showLoginModal(event)}>Login</Button>}
            </div>
        </div>
    );
};

LoginOut.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    goToUrl: PropTypes.func,
    showLoginModal: PropTypes.func,
    logout: PropTypes.func
};

export default LoginOut;
