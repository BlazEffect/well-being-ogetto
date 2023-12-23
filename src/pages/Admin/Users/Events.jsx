import {Space, Table} from "antd";
import {useEffect, useState} from "react";
import {getAllEvents} from "@/services/EventService";

const columns = [
  {
    title: 'Название мероприятия',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Описание',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Время начала',
    dataIndex: 'time_start',
    key: 'time_start',
  },
  {
    title: 'Время конца',
    dataIndex: 'time_end',
    key: 'time_end',
  },
  {
    title: 'Пользователь',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setEvents(await getAllEvents());
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={events}
        loading={loading}
      />
    </div>
  )
}

export default Events;
