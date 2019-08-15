import React, { Component } from 'react';

import Header from '../components/Header';
import withAuth from '../hoc/withAuth.js';
import messagesService from '../services/messages-service';
import MessageCard from '../components/MessageCard';
import text from '../translations/texts_ES.json';
import { ReactComponent as WriteMessageIcon } from '../svg/write-message.svg';

class Home extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    messagesService.getAllMessages().then(res => {
      this.setState({ messages: res.data.messages });
    });
  }

  handleDeleteMessage(id) {
    messagesService.deleteMessage(id).then(() => {
      // const messagesCopy = [...this.state.messages];
    });
  }

  render() {
    const { messages } = this.state;
    const { home } = text;
    return (
      <section className="home-section">
        <Header />
        <h2>{home.tagline}</h2>
        {messages.length
          ? messages.map(message => (
              <div key={message._id}>
                <MessageCard
                  message={message}
                  deleteHandler={this.handleDeleteMessage}
                />
              </div>
            ))
          : null}
        <button className="btn new-message-btn">
          <WriteMessageIcon />
          {home.new_message}
        </button>
      </section>
    );
  }
}

export default withAuth(Home);
