import axios from 'axios';
import {notification} from "antd";

const login = async ({ loginData }) => {
  try {
    //const response = await axios.post('/api/token', loginData);
    const response = {
      status: 200,
      data: {
        access: 'token',
        refresh: 'token'
      }
    }

    const { status, data } = response;

    notification.config({
      duration: 2,
      maxCount: 2,
    });
    notification.success({
      message: `Request success`,
      description: '',
    });

    return data;
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
}

const logout = async () => {
  try {
    const response = await axios.post('/api/logout');
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
}

export { login, logout };
