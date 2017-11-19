import React from 'react';
import Button from './stateless/Button';
import IconBtn from './stateless/IconBtn';
import UserPhoto from './UserPhoto';

const LoginOut = ({ user = {}, props }) => {
    return (
        <div className="loginout">
            <div className="user-menu">
                <IconBtn
                    iconClass="github"
                    style={{ verticalAlign: 'bottom' }}
                    onClick={(event) => props.goToGithub(event)} />

                <span className="user-meta">
                    <UserPhoto
                        style={{ border: '1px solid rgba(51, 51, 51, 0.50)' }}
                        imgSrc={user.photo}
                        size={20} />

                    <span className="username">
                        {user.displayName}
                    </span>
                </span>

                {(!user.isAnonymous) && <Button className="logout" onClick={(event) => props.logout()}> Logout</Button>}

                {(user.isAnonymous) && <Button className="login" onClick={(event) => props.showLoginModal(event)}>Login</Button>}
            </div>
        </div>
    );
}

export default LoginOut;
