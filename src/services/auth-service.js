import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/auth',
      withCredentials: true
    });
  }

  signup(user) {
    const { username, password } = user;
    return this.auth
      .post('/signup', { username, password })
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth
      .post('/login', { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/logout').then(res => res.data);
  }

  me() {
    return this.auth.get('/me').then(res => res.data);
  }

  myMessages() {
    return this.auth.get('/myMessages').then(res => res.data);
  }
}

const authService = new AuthService();

export default authService;
