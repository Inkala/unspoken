import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import authService from '../services/auth-service';
import messageService from '../services/message-service';
import withAuth from '../hoc/withAuth.js';
import NotificationsMenu from './NotificationsMenu';
import SideMenu from './SideMenu';

import { ReactComponent as Logo } from '../svg/logo-icon.svg';
import { ReactComponent as Notifications } from '../svg/notifications.svg';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { ReactComponent as FAQs } from '../svg/faqs.svg';
import text from '../translations/texts_ES.json';

class Navbar extends Component {
  state = {
    sideMenuShowing: false,
    notificationsShowing: false,
    userMessages: null,
    notifications: [],
    myMessages: null
  };

  componentDidMount() {
    this.filterNotifications();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.notificationsShowing !== this.state.notificationsShowing) {
      this.filterNotifications();
    }
  }

  filterNotifications = () => {
    authService.myMessages().then(res => {
      const notifications = [];
      res.myMessages.map(message => {
        const { likes, comments, reactions } = message;
        const notification = {
          id: message._id,
          content: message.content
        };
        notification.likes = likes.filter(like => like.new);
        notification.reactions = reactions.filter(reaction => reaction.new);
        notification.comments = comments.filter(comment => comment.new);
        if (
          notification.likes.length ||
          notification.reactions.length ||
          notification.comments.length
        ) {
          notifications.unshift(notification);
          
        }
        return message;
      });
      this.setState({
        myMessages: res.myMessages,
        notifications
      });
    });
  }

  logout = () => {
    this.props.logout();
    this.setState({ sideMenuShowing: false });
  };


  removeNotifications = (messageId) => {
    messageService
      .removeNotifications(messageId)
      .then((res) => {
        this.filterNotifications();
      })
      .catch(err => console.log(err));
  }

  render() {
    const { login, signup } = text.signup;
    const { notifications } = this.state;
    return (
      <>
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <Logo onClick={() => {
              this.setState({
                notificationsShowing: false,
                sideMenuShowing: false
              });
            }}/>
          </Link>
          {this.props.isLoggedIn ? (
            <ul>
              <li className="notification" onClick={() => {
                this.setState({
                  notificationsShowing: !this.state.notificationsShowing,
                  sideMenuShowing: false
                });
              }}>
                {notifications.length ? (
                  <div className="notification-wrapper" />
                ) : null}
                <Notifications className="nav-icons" />
              </li>
              <li onClick={() => {
                this.setState({
                  sideMenuShowing: !this.state.sideMenuShowing,
                  notificationsShowing: false
                });
              }}>
                <Profile className="nav-icons"/>
              </li>
              <li>
                <FAQs className="nav-icons" />
              </li>
            </ul>
          ) : (
            <section className='signup-links'>
              <Link className="btn signup-btn" to="/login">{login}</Link>
              <span>/</span>
              <Link className="btn signup-btn" to="/signup">{signup}</Link>
            </section>
          )}
        </nav>
        <NotificationsMenu
          notifications={notifications}
          showing={this.state.notificationsShowing}
          handleClose={() => {
            this.setState({ notificationsShowing: false });
          }}
          removeNotifications={this.removeNotifications}
        />
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
