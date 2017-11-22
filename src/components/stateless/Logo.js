import React from 'react'
import { Link } from 'react-router-dom';

const Logo = ({ ...props }) => (
    <div className="logo">
        <h1>
            <Link to="/">Webernote<sup>TM</sup></Link>
        </h1>
        <span className="tagline">
            Real-time note taking. Increase your productivity!
        </span>
    </div>
);

export default Logo;
