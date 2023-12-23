import axios from 'axios';
import {notification} from "antd";

const login = async (tokenResponse) => {
  notification.config({
    duration: 2,
    maxCount: 2,
  });

  try {
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {headers: {Authorization: `Bearer ${tokenResponse.access_token}`}},
    );

    const {status, data} = userInfo;

    if (status === 200) {
      const createUser = await axios.post('/api/reg?token=' + tokenResponse.access_token + '&first_name=' + data.given_name + '&last_name=' + data.family_name + '&mail=' + data.email + '&pfp_url=' + data.picture);

      if (createUser.status === 200) {
        window.localStorage.setItem('userData', JSON.stringify(createUser.data));

        notification.success({
          message: 'Успешная авторизация',
        });
      }
    }
  } catch (error) {
    notification.error({
      message: 'Ошибка при выполнении авторизации',
    });

    throw new Error('Ошибка при выполнении запроса');
  }
}

export {login};
