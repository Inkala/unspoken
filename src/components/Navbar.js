import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import authService from '../services/auth-service';
import withAuth from '../hoc/withAuth.js';
import SideMenu from './SideMenu';
import { ReactComponent as Logo } from '../svg/logo-icon.svg';
import { ReactComponent as Notifications } from '../svg/notifications.svg';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { ReactComponent as FAQs } from '../svg/faqs.svg';
import text from '../translations/texts_ES.json';

class Navbar extends Component {
  state = {
    sideMenuShowing: false,
    userMessages: null,
    notifications: false,
    myMessages: null
  };

  componentDidMount() {
    authService.myMessages().then(res => {
      let notifications = false;
      res.myMessages.map(message => {
        const { likes, comments, reactions } = message;
        likes.map(like => {
          if (like.new) {
            notifications = true;
          }
          return like;
        });
        reactions.map(reaction => {
          if (reaction.new) {
            notifications = true;
          }
          return reaction;
        });
        comments.map(comment => {
          if (comment.new) {
            notifications = true;
          }
          return comment;
        });
        return message;
      });
      this.setState({ myMessages: res.myMessages, notifications });
    });
  }

  logout = () => {
    this.props.logout();
    this.setState({ sideMenuShowing: false });
  };

  render() {
    const { signup } = text.signup;
    const {notifications} = this.state;
    return (
      <>
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
          {this.props.isLoggedIn ? (
            <ul>
              <li className="notification">
                {notifications ? <div className="notification-wrapper"></div> : null}
                <Notifications className="nav-icons" />
              </li>
              <li>
                <Profile
                  className="nav-icons"
                  onClick={() => {
                    this.setState({
                      sideMenuShowing: !this.state.sideMenuShowing
                    });
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
