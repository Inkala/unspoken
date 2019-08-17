import axios from 'axios';

class MessagesService {
  constructor() {
    this.messages = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true
    });
  }

  getAllMessages() {
    return this.messages.get('/messages').then(res => res);
  }

  createMessage(newMessage) {
    return this.messages.post('/messages/new', newMessage);
  }

  getOneMessage(id) {
    return this.messages.get(`/messages/${id}`).then(res => res);
  }

  editMessage(id, editedMessage) {
    console.log('<< id >>', id)
    console.log('<< editedMessage >>', editedMessage)
    return this.messages
      .put(`/messages/${id}/edit`, editedMessage)
      .then(res => res);
  }

  deleteMessage(id) {
    return this.messages.delete(`/messages/${id}/delete`).then(res => res);
  }
}

const messagesService = new MessagesService();

export default messagesService;
