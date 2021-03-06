import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import withAuth from '../hoc/withAuth';
import CardMenu from './CardMenu';
import CategoryMenu from './CategoryMenu';
import ConfirmationModal from './ConfirmationModal';

import { ReactComponent as ArrowDown } from '../svg/arrow-down.svg';
import { ReactComponent as Like } from '../svg/like.svg';
import { ReactComponent as Comments } from '../svg/comments.svg';
import { ReactComponent as More } from '../svg/more.svg';

import authService from '../services/auth-service';
import messageService from '../services/message-service';
import reactionService from '../services/reaction-service';
import text from '../translations/texts_ES.json';

class MessageCard extends Component {
  state = {
    message: {},
    myMessage: false,
    menuShowing: false,
    categoryShowing: false,
    confirmationShowing: false,
    likes: 0,
    reactions: 0,
    likedByMe: '',
    myReaction: ''
  };

  componentDidMount() {
    const { messageId } = this.props;
    this.filterNotifications();
    messageService.getOneMessage(messageId).then(res => {
      this.setMessagesToState(res);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.filterNotifications();
    }
    const { id } = this.props.match.params;
    if (prevProps.match.params.id !== id) {
      messageService.getOneMessage(id).then(res => {
        this.setMessagesToState(res);
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.notificationsShowing !== this.state.notificationsShowing) {
  //     this.filterNotifications();
  //   }
  // }

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

  setMessagesToState = res => {
    const message = res.data.message;
    const userId = this.props.user._id;
    const myMessage = message.owner === this.props.user.username;
    const likes = message.likes.length;
    const reactions = message.reactions.length;
    let likedByMe = this.state.likedByMe;
    let myReaction = this.state.myReaction;
    message.likes.forEach(like => {
      if (like.userId === userId) {
        likedByMe = like._id;
      }
    });
    message.reactions.forEach(reaction => {
      if (reaction.userId === userId) {
        myReaction = reaction._id;
      }
    });
    this.setState({
      message,
      myMessage,
      likes,
      reactions,
      likedByMe,
      myReaction
    });
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

  handleLike = messageId => {
    reactionService.likeMessage(messageId).then(res => {
      const likedByMe = res.data.like._id;
      this.setState({
        likes: this.state.likes + 1,
        likedByMe
      });
    });
  };

  handleDislike = messageId => {
    reactionService.dislikeMessage(this.state.likedByMe, messageId).then(() => {
      this.setState({
        likes: this.state.likes - 1,
        likedByMe: ''
      });
    });
  };

  handleAddReaction = messageId => {
    reactionService.addMessageReaction(messageId).then(res => {
      const myReaction = res.data.reaction._id;
      this.setState({
        reactions: this.state.reactions + 1,
        myReaction
      });
    });
  };

  handleRamoveReaction = messageId => {
    reactionService
      .removeMessageReaction(this.state.myReaction, messageId)
      .then(() => {
        this.setState({
          reactions: this.state.reactions - 1,
          myReaction: ''
        });
      });
  };

  handleCategoryChange = category => {
    const { _id } = this.state.message;
    const content = { category };
    messageService
      .editMessage(_id, content)
      .then(res => res)
      .catch(err => console.log(err));
    const message = { ...this.state.message };
    message.category = category;
    this.setState({ message });
  };

  render() {
    const {
      category,
      comments,
      content,
      owner,
      created_at,
      _id
    } = this.state.message;
    const {
      menuShowing,
      categoryShowing,
      modalShowing,
      likes,
      reactions,
      likedByMe,
      myReaction,
      myMessage
    } = this.state;
    const { i_understand } = text.home;
    const formatedDate = this.formatDate(new Date(created_at));
    return (
      <article className="message-card">
        <p className="message-content">{content}</p>
        <div className="message-bottom" />
        <section className="message-info">
          <p>
            <strong>{owner ? owner : 'Anónimo'}</strong>
          </p>
          <p>{formatedDate[0]}</p>
          <p>{formatedDate[1]}</p>
          {myMessage ? (
            <button
              className={`categories${category ? '' : ' no-cat'}`}
              onClick={() => {
                this.setState({ categoryShowing: !categoryShowing });
              }}
            >
              {category ? text.categories[category] : 'Categoría'}
              <ArrowDown />
              {categoryShowing ? (
                <CategoryMenu changeCategory={this.handleCategoryChange} />
              ) : null}
            </button>
          ) : (
            <p className={`categories${category ? '' : ' no-cat'}`}>
              {category ? text.categories[category] : 'Categoría'}
            </p>
          )}
        </section>
        <section className="message-reactions">
          <div className="reaction-btn">
            <button
              className={`text-button ${myReaction ? 'by-me' : ''}`}
              onClick={
                myReaction
                  ? () => {
                      this.handleRamoveReaction(_id);
                    }
                  : () => {
                      this.handleAddReaction(_id);
                    }
              }
            >
              "{i_understand}"
            </button>
            {reactions}
          </div>
          <div className="reaction-btn">
            <button
              className="reaction-icon"
              onClick={
                likedByMe
                  ? () => {
                      this.handleDislike(_id);
                    }
                  : () => {
                      this.handleLike(_id);
                    }
              }
            >
              <Like className={`like ${likedByMe ? 'by-me' : ''}`} />
            </button>
            {likes}
          </div>
          <div className="reaction-btn">
            <Link className="reaction-icon" to={`/messages/${_id}`}>
              <Comments />
            </Link>
            {comments ? comments.length : 0}
          </div>
          <div className="reaction-btn">
            {myMessage ? (
              <button
                className="reaction-icon"
                onClick={() => {
                  this.setState({ menuShowing: !menuShowing });
                }}
              >
                <More />
              </button>
            ) : (
              <More className="disabled" />
            )}
          </div>
          {menuShowing ? (
            <CardMenu
              messageId={_id}
              handleShowModa={() => {
                this.setState({ modalShowing: true });
              }}
            />
          ) : null}
          {modalShowing ? (
            <ConfirmationModal
              handleClose={() => {
                this.setState({
                  modalShowing: false,
                  menuShowing: false
                });
              }}
              handleDeleteMessage={() => {
                this.props.handleDeleteMessage(_id);
              }}
            />
          ) : null}
        </section>
      </article>
    );
  }
}

export default withRouter(withAuth(MessageCard));
