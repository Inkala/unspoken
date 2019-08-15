import React from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../hoc/withAuth.js';
import { ReactComponent as Logo } from '../svg/logo-icon.svg';
import { ReactComponent as Notifications } from '../svg/notifications.svg';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { ReactComponent as FAQs } from '../svg/faqs.svg';

const Navbar = props => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <Logo />
      </Link>
      {props.isLoggedIn ? (
        <ul>
          <li>
            <Notifications className="nav-icons" />
          </li>
          <li>
            <Profile className="nav-icons" />
          </li>
          <li>
            <FAQs className="nav-icons" />
          </li>
          <li>
            <p className="btn signup-btn" onClick={props.logout}>
              Logout
            </p>
          </li>
        </ul>
      ) : (
        <Link className="btn signup-btn" to="/signup">
          Signup
        </Link>
      )}
    </nav>
  );
};

export default withAuth(Navbar);
