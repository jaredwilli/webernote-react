import React from 'react';
import Button from './stateless/Button';
import IconBtn from './stateless/IconBtn';
import UserPhoto from './UserPhoto';

const LoginOut = ({ user = {}, ...props }) => {
    return (
        <div className="loginout">
            <div className="user-menu">
                <IconBtn
                    iconClass="github"
                    style={{ verticalAlign: 'bottom' }}
                    onclick={(e) => props.goToGithub(e)} />

                <span className="user-meta">
                    <UserPhoto
                        size={20}
                        style={{ border: '1px solid rgba(51, 51, 51, 0.50)' }}
                        imgSrc={user.photo} />

                    <span className="username">
                        {user.displayName}
                    </span>
                </span>

                {(!user.isAnonymous) && <Button className="logout" onClick={(e) => props.logout()}>Logout</Button>}

                {(user.isAnonymous) && <Button className="login" onClick={(e) => props.showLoginModal(e)}>Login</Button>}
            </div>
        </div>
    );
}

export default LoginOut;
