import React from 'react'

const UsersListPage = ({ match, ...props }) => {
    debugger;

    return (
        <div>
            User Profile for user: {match.params.userId}
        </div>
    )
}

export default UsersListPage
