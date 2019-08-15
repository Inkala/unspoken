import axios from 'axios';

class MessagesService {
  constructor() {
    this.messages = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true
    });
  }

  getAllMessages() {
    return this.messages.get('/messages')
    .then(res => res)
  }

  createMessage(newMessage) {
    return this.message.post('/messages/new')
  }

  getOneMessage(id) {

  }

  editMessage(id, editedMessage) {
    return this.messages.put(`/messages/${id}/edit`, editedMessage)
    .then(res => res)
  }

  deleteMessage(id) {
    return this.message.delete(`/messages/${id}/delete`)
    .then(res => res)
  }

}

const messagesService = new MessagesService();

export default messagesService;