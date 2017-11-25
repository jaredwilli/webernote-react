import React from 'react';

const UserProfilePage = ({ match, ...props }) => {
    debugger;

    return (
        <div>
            User Profile for user: {match.params.userId}
        </div>
    );
}

export default UserProfilePage;
