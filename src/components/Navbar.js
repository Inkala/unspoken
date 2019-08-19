import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SideMenu from './SideMenu';
import withAuth from '../hoc/withAuth.js';
import { ReactComponent as Logo } from '../svg/logo-icon.svg';
import { ReactComponent as Notifications } from '../svg/notifications.svg';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { ReactComponent as FAQs } from '../svg/faqs.svg';
import text from '../translations/texts_ES.json';

class Navbar extends Component {
  state = {
    sideMenuShowing: false
  };

  logout =() => {
    this.props.logout()
    this.setState({sideMenuShowing: false})
  }

  render() {
    const { signup } = text.signup;

    return (
      <>
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
          {this.props.isLoggedIn ? (
            <ul>
              <li>
                <Notifications className="nav-icons" />
              </li>
              <li>
                <Profile
                  className="nav-icons"
                  onClick={() => {
                    this.setState({ sideMenuShowing: true });
                  }}
                />
              </li>
              <li>
                <FAQs className="nav-icons" />
              </li>
            </ul>
          ) : (
            <Link className="btn signup-btn" to="/signup">
              {signup}
            </Link>
          )}
        </nav>
        <SideMenu
          showing={this.state.sideMenuShowing}
          logout={this.logout}
          handleClose={() => {
            this.setState({ sideMenuShowing: false });
          }}
        />
      </>
    );
  }
}

export default withAuth(Navbar);
