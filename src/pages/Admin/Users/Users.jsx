import {Space, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import * as userService from "@/services/UserService";
import {AuthContext} from "@/contexts/AuthContext.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authData } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setUsers(await userService.getAllUsers());
    setLoading(false);
  }

  const deleteUser = async (userId, token) => {
    setLoading(true);
    await userService.deleteUser(userId, token);
    setLoading(false);
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'age',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'address',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => deleteUser(record.key, authData.token)}>Удалить пользователя</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
      />
    </div>
  )
}

export default Users;
