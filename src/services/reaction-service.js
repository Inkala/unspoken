import axios from 'axios';

class ReactionsService {
  constructor() {
    this.messages = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true
    });
  }

  likeMessage(messageId) {
    return this.messages.post(`/likes/${messageId}`);
  }

  dislikeMessage(likeId, messageId) {
    return this.messages.delete(`/likes/${likeId}/${messageId}/delete`)
    .then(res => res);
  }

  addMessageReaction(messageId) {
    return this.messages.post(`/reactions/${messageId}`);
  }

  removeMessageReaction(reactionId, messageId) {
    return this.messages.delete(`/reactions/${reactionId}/${messageId}/delete`)
      .then(res => res);
  }
  
  addComment(messageId, newMessage) {
    return this.messages.post(`/comments/${messageId}/new`, newMessage);
  }
}

const reactionsService = new ReactionsService();

export default reactionsService;

// getOneMessage(id) {
//   return this.messages.get(`/messages/${id}`).then(res => res);
// }

// editMessage(id, editedMessage) {
//   return this.messages
//     .put(`/messages/${id}/edit`, editedMessage)
//     .then(res => res);
// }

// deleteMessage(id) {
//   return this.messages.delete(`/messages/${id}/delete`).then(res => res);
// }
