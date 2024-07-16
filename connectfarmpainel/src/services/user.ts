import api from './api';
import Cookies from 'js-cookie';

export class UserService {
  public async login(username: string, password: string) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await api.post('/user/login', formData);

      if (response.data.access_token) {
        const expires = 600 / 1440;
        Cookies.set('_cnctfarm_token', response.data.access_token, { expires });
      }

      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Login failed');
    }
  }
}
