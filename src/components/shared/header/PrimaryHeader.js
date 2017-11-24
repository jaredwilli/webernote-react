import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../header/Logo';
import LoginOut from '../header/LoginOut';

import { ROLES, PERMISSIONS } from '../../../constants/userConst.js';

const PrimaryHeader = ({ match, user = {}, ...props }) => {
    return (
        <header>
            <LoginOut
                user={user}
                match={match}
                goToUrl={props.goToUrl}
                showLoginModal={props.showLoginModal}
                logout={props.logout} />

            <div className="page-nav">
                <nav>
                    <NavLink to="/app" exact activeClassName="active">Notes</NavLink>
                    {(!user.isAnonymous) &&
                    <NavLink to="/app/users" activeClassName="active">Users</NavLink>}

                    {(!user.isAnonymous && user.role === ROLES.SUPERADMIN && user.permissions.indexOf(PERMISSIONS.OMEGA) >= 0) &&
                        <NavLink to="/app/admin" activeClassName="active">Admin</NavLink>
                    }
                </nav>
            </div>

            <Logo />
        </header>
    );
};

PrimaryHeader.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object,
    goToUrl: PropTypes.func,
    showLoginModal: PropTypes.func,
    logout: PropTypes.func
};

export default PrimaryHeader;
