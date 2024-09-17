import api from './api';
import Cookies from 'js-cookie';
import { RegisterType } from '@/schemas/User';

export class UserService {
  public async login(username: string, password: string) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await api.post('/user/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.access_token) {
        const expires = 600 / 1440;
        Cookies.set('_cnctfarm_token', response.data.access_token, { expires });
      }

      return response.data;
    } catch (error) {
      console.error(error)
      throw new Error('Login failed');
    }
  }


  public async register(values: RegisterType) {
    try {
      const { confirmPassword, ...data } = values;

      const response = await api.post('/user/register', data);

      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }


  public async logout() {
    try {
      Cookies.remove('_cnctfarm_token');
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
}
