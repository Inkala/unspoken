import React, { Component } from 'react';

import CardMenu from './CardMenu';
import { ReactComponent as ArrowDown } from '../svg/arrow-down.svg';
import { ReactComponent as Like } from '../svg/like.svg';
import { ReactComponent as Comments } from '../svg/comments.svg';
import { ReactComponent as More } from '../svg/more.svg';
import text from '../translations/texts_ES.json';

class MessageCard extends Component {
  state = {
    menuShowing: false
  };

  render() {
    const {
      category,
      comments,
      content,
      created_at,
      likes,
      reactions,
      _id
    } = this.props.message;
    const { menuShowing } = this.state;
    const { i_understand } = text.home;
    return (
      <article className="message-card">
        <p className="message-content">{content}</p>
        <div className="message-bottom" />
        <section className="message-info">
          <p>
            <strong>{_id}</strong>
          </p>
          <p>{created_at}</p>
          <button className="categories">
            {category ? { category } : 'Categoría'}
            <ArrowDown />
          </button>
        </section>
        <section className="message-reactions">
          <button className="reaction-btn text-button">"{i_understand}"</button>
          {reactions.length}
          <button className="reaction-btn">
            <Like className="like" />
          </button>
          {likes.length}
          <button className="reaction-btn">
            <Comments />
          </button>
          {comments.length}
          <button
            className="reaction-btn"
            onClick={() => {
              this.setState({ menuShowing: !menuShowing })
            }}
          >
            <More />
          </button>
        {menuShowing ? (
          <CardMenu messageId={_id} handleDeleteMessage={() => {this.props.handleDeleteMessage(_id)}} />
        ) : null}
        </section>
      </article>
    );
  }
}

export default MessageCard;
