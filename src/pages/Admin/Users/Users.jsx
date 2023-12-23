import {Space, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";

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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const usersData = await axios.get('/api/all_user');
    setUsers(usersData.data.users);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

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
