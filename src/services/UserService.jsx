import axios from "axios";

const getAllUsers = async () => {
  try {
    const users = await axios.get('/api/all_user');

    const {status, data} = users;

    if (status === 200) {
      return data.users;
    }
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
}

export {getAllUsers};
