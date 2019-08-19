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
}

const reactionsService = new ReactionsService();

export default reactionsService;
