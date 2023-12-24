import {Space, Table} from "antd";
import {useContext, useEffect, useState} from "react";
import moment from "moment";
import * as eventService from "@/services/EventService"
import {AuthContext} from "@/contexts/AuthContext.jsx";

moment.tz.setDefault('Europe/Moscow');
moment.locale('ru');

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authData } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setEvents(await eventService.getAllEvents());
    setLoading(false);
  }

  const deleteEvent = async (cardId, token) => {
    setLoading(true);
    await eventService.deleteEvent(cardId, token);
    setLoading(false);
  }

  const columns = [
    {
      title: 'Название мероприятия',
      dataIndex: 'name',
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
      render: (text) => moment.unix(text / 1000).format("LLLL")
    },
    {
      title: 'Время конца',
      dataIndex: 'time_end',
      key: 'time_end',
      render: (text) => moment.unix(text / 1000).format("LLLL")
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
          <a onClick={() => deleteEvent(record.key, authData.token)}>Удалить событие</a>
        </Space>
      ),
    },
  ];

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
