import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import withAuth from '../hoc/withAuth.js';
import messagesService from '../services/messages-service';
import MessageCard from '../components/MessageCard';
import Footer from '../components/Footer';
import text from '../translations/texts_ES.json';
import { ReactComponent as WriteMessageIcon } from '../svg/write-message.svg';
import { ReactComponent as ArrowDown } from '../svg/arrow-down.svg';

class Home extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    messagesService.getAllMessages().then(res => {
      this.setState({ messages: res.data.messages });
    });
  }

  handleDeleteMessage = id => {
    messagesService.deleteMessage(id).then(() => {
      const filteredMessages = this.state.messages.filter(message => {
        return message._id !== id;
      });
      this.setState({ messages: filteredMessages });
    });
  };

  render() {
    const { messages } = this.state;
    const { tagline, more, new_message } = text.home;
    return (
      <section className="home-section">
        <Header />
        <h2>{tagline}</h2>
        <section className="messages-section">
          <main className="messages-wrapper">
            {messages.length
              ? messages.map(message => (
                  <React.Fragment key={message._id}>
                    <MessageCard
                      message={message}
                      handleDeleteMessage={this.handleDeleteMessage}
                    />
                  </React.Fragment>
                ))
              : null}
          </main>
          <button className="view-more">
            {more}
            <ArrowDown />
          </button>
          <Link to="/new-message" className="btn new-message-btn">
            <WriteMessageIcon />
            {new_message}
          </Link>
        </section>
        <Footer />
      </section>
    );
  }
}

export default withAuth(Home);
