import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../hoc/withAuth.js';

class Navbar extends Component {
  render() {
    return (
      <header className="navbar">
        <Link to="/" className="nav-logo">
          <img
            src={process.env.PUBLIC_URL + '/img/logo-icon.svg'}
            alt="Unspoken logo"
          />
        </Link>
        {this.props.isLoggedIn ? (
          <ul>
            <li />
          </ul>
        ) : (
          <Link class="btn signup-btn" to="/signup">
            Signup
          </Link>
        )}
      </header>
    );
  }
}

export default withAuth(Navbar);

/* <p onClick={this.props.logout}>Logout</p> */
