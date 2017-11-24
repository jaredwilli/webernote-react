import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

// Sub Pages
import HomePage from '../HomePage';
import UserProfilePage from './UserProfilePage';
import UsersListPage from './UsersListPage';
import AddUserPage from './AddUserPage';

import UserNav from '../components/ui/UserNav';

const UserDetailPage = ({ match, ...props }) => {

    debugger;
    return (
        <div className="user-detail-page">
            <aside>
                <UserNav />
            </aside>

            <div className="primary-content">
                <Switch>
                    <Route
                        path={match.path} exact
                        component={UsersListPage} />
                    <Route
                        path={`${match.path}/add`} exact
                        component={AddUserPage} />
                    <Route
                        path={`${match.path}/:userId/profile`}
                        component={UserProfilePage} />
                    <Route
                        path={`${match.path}/admin`}
                        component={AdminPage} />
                    <Route
                        path={`${match.path}/:userId`}
                        component={HomePage} />
                </Switch>
            </div>
        </div>
    );
}

export default UserDetailPage;
