import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import messageService from '../services/message-service';
import { ReactComponent as Publish } from '../svg/publish.svg';
import text from '../translations/texts_ES.json';

class NewMessage extends Component {
  state = {
    message: '',
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    messageService.getOneMessage(id).then(res => {
      const message = res.data.message.content;
      this.setState({ message });
    });
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
    const { id } = this.props.match.params;
    const content = this.state.message;
    event.preventDefault();
    messageService
      .editMessage(id, { content })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { message, redirect } = this.state;
    const { post } = text.new_message;

    return (
      <article className="message-editor">
        <section className="message-setting" />
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="message"
            name="message"
            rows="25"
            value={message}
            onChange={this.handleChange}
          />
          <button>
            <Publish />
            {post}
          </button>
        </form>
        {redirect ? <Redirect to="/" /> : null}
      </article>
    );
  }
}

export default NewMessage;
