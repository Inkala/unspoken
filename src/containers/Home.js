import React, { Component } from 'react';

import Header from '../components/Header';
import withAuth from '../hoc/withAuth.js';
import messagesService from '../services/messages-service';
import MessageCard from '../components/MessageCard';
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
        <section className="messages">
          {messages.length
            ? messages.map(message => (
                <React.Fragment key={message._id}>
                  <MessageCard
                    message={message}
                    handleDeleteMessage={this.deleteMessageHandler}
                  />
                </React.Fragment>
              ))
            : null}
        </section>
        <button className="view-more">
          VER MÁS
          <ArrowDown />
        </button>
        <button className="btn new-message-btn">
          <WriteMessageIcon />
          {home.new_message}
        </button>
      </section>
    );
  }
}

export default withAuth(Home);
