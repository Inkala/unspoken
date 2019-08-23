import axios from 'axios';

class MessageService {
  constructor() {
    this.messages = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/messages',
      withCredentials: true
    });
  }

  getAllMessages() {
    return this.messages.get('').then(res => res);
  }

  createMessage(newMessage) {
    return this.messages.post('/new', newMessage).then(res => {
    });
  }

  getOneMessage(id) {
    return this.messages.get(`/${id}`).then(res => res);
  }

  editMessage(id, editedMessage) {
    return this.messages.put(`/${id}/edit`, editedMessage).then(res => res);
  }

  deleteMessage(id) {
    return this.messages.delete(`/${id}/delete`).then(res => res);
  }

  removeNotifications(id) {
    return this.messages.put(`/${id}/notifications`).then(res => res);
  }
}

const messageService = new MessageService();

export default messageService;
