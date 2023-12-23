import {Button, Space, Table} from "antd";
import data from "@/data/users.json";
import {PlusOutlined} from "@ant-design/icons";

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
  return (
    <div>
      <Button type="primary" shape="round" icon={<PlusOutlined />} size="large">
        Создать
      </Button>

      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default Users;
