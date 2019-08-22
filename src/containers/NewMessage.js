import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import messageService from '../services/message-service';
import { ReactComponent as Publish } from '../svg/publish.svg';
import text from '../translations/texts_ES.json';
import EmptyMessage from '../components/EmptyMessage';

class NewMessage extends Component {
  state = {
    message: '',
    redirect: false,
    placeholderShowing: true,
    errorShowing: false
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    messageService
      .createMessage({
        content: this.state.message
      })
      .then(res => {
        this.setState({ redirect: true });
      })
      .catch(err => {
        this.setState({ errorShowing: true });
      });
  };

  render() {
    const { message, redirect, placeholderShowing, errorShowing } = this.state;
    const { post, placeholder } = text.new_message;
    return (
      <article className="message-editor">
        <section className="message-setting" />
        <form onSubmit={this.handleSubmit}>
          {placeholderShowing ? (
            <div
              className="placeholder"
              onClick={() => {
                this.setState({ placeholderShowing: false });
              }}
            >
              {placeholder.map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
          ) : (
            <textarea
              autoFocus
              id="message"
              name="message"
              rows="25"
              value={message}
              onChange={this.handleChange}
            />
          )}
          <button>
            <Publish />
            {post}
          </button>
        </form>
        {errorShowing ? (
          <EmptyMessage
            handleClose={() => {
              this.setState({ errorShowing: false });
            }}
          />
        ) : null}
        {redirect ? <Redirect to="/" /> : null}
      </article>
    );
  }
}

export default NewMessage;
