import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ history, ...props }) => {
    debugger;

    return (
        <div>
            <h1>Login Page</h1>
            <p>
                For this example application, we cannot visit <Link to="/app">/app</Link>
                until we are logged in. Clicking the "Login" button will simulate a login by
                setting Redux state. This example compliments the CSS-Tricks article I wrote
                for <a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/react-router-4/">React
                Router 4</a>.
            </p>

            <button onClick={() => {
                props.login().then(() => {
                    history.push('/app')
                })
            }}>Login</button>
        </div>
    );
}

export default LoginPage;
