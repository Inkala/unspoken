import React, { Component } from 'react';

import MessageCard from './MessageCard';
import CommentsForm from './CommentsForm';
import Header from './Header';

import messageService from '../services/message-service';
import reactionService from '../services/reaction-service';

import text from '../translations/texts_ES.json';

class MessageView extends Component {
  state = {
    messageId: '',
    newComment: '',
    comments: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    messageService.getOneMessage(id).then(res => {
      const { comments } = res.data.message;
      this.setState({
        messageId: id,
        comments
      });
    });
  }

  handleChange = event => {
    this.setState({ newComment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newComment = this.state.newComment;
    const { id } = this.props.match.params;
    reactionService.addComment((id), { newComment })
      .then((res) => {
        const {comment} = res.data
        const comments = [...this.state.comments]
        comments.push(comment)
        this.setState({ comments, newComment: '' });
      })
      .catch(err => console.log(err));
  };

  formatDate = date => {
    const day = date.getDate();
    const mon = date.getMonth() + 1;
    const yr = date
      .getFullYear()
      .toString()
      .slice(2, 4);
    return [`${day}/${mon}/${yr}`, `${date.getHours()}.${date.getMinutes()} h`];
  };

  render() {
    const { messageId, comments, newComment } = this.state;
    const comments_title = text.message_actions.comments;
    return (
      <section className="messages-view">
        <Header />
        <section className="messages-wrapper">
          {messageId && (
            <MessageCard
            messageId={messageId}
            handleDeleteMessage={this.handleDeleteMessage}
            />
            )}
        </section>
        <section className="comments">
          <h3>{comments_title}</h3>
          {comments &&
            comments.map(comment => {
              const formatedDate = this.formatDate(new Date(comment.created_at));
              return <article key={comment._id} className="comment-card">
                <p><strong>{comment.owner}</strong></p>
                <p>{comment.content}</p>
                <p className="date"><span>{formatedDate[0]}</span><span>{formatedDate[1]}</span></p>
              </article>
            })}
        </section>
        <CommentsForm
          content={newComment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </section>
    );
  }
}

export default MessageView;
