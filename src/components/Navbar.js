import React from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth.js';

const Navbar = props => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img
          src={process.env.PUBLIC_URL + '/img/logo-icon.svg'}
          alt="Unspoken logo"
        />
      </Link>
      {props.isLoggedIn ? (
        <ul>
          <li>
            <img src={process.env.PUBLIC_URL + '/img/icons/notifications.svg'} alt="" />
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/img/icons/profile.svg'} alt="" />
          </li>
          <li>
            <img src={process.env.PUBLIC_URL + '/img/icons/faqs.svg'} alt="" />
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
