import {Button, DatePicker, Form, Input, Modal, Space, Table, TimePicker} from "antd";
import {useCallback, useContext, useEffect, useState} from "react";
import moment from "moment";
import * as eventService from "@/services/EventService"
import {AuthContext} from "@/contexts/AuthContext.jsx";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

moment.tz.setDefault('Europe/Moscow');
moment.locale('ru');

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Events = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDataTime, setStartDataTime] = useState(new Date());
  const [endDataTime, setEndDataTime] = useState(new Date());
  const [url, setUrl] = useState('');

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
    const updatedEvents = events.filter(item => item.key !== cardId);
    setEvents(updatedEvents);
    setLoading(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const handleModalOk = useCallback(() => {
    const newStartDate = moment(startDataTime).unix() * 1000;
    const newEndDate = moment(endDataTime).unix() * 1000;
    eventService.addEvent(title, description, newStartDate, newEndDate, url);
    setIsModalOpen(false);
  }, [setIsModalOpen, title, description, startDataTime, endDataTime, url]);

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const addTitle = (value) => {
    setTitle(value.target.value);
  }

  const addDescription = (value) => {
    setDescription(value.target.value);
  }

  const addStartDateTime = (value, dateString) => {
    if (value) {
      setStartDataTime(value['$d']);
    }
  }

  const addEndDateTime = (value, dateString) => {
    if (value) {
      setEndDataTime(value['$d']);
    }
  }

  const addUrl = (value) => {
    setUrl(value.target.value);
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
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size="large"
        onClick={openModal}
      >
        Создать мероприятие
      </Button>

      <Table
        columns={columns}
        dataSource={events}
        loading={loading}
      />

      <Modal
        title="Создание мероприятия"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{layout: "vertical"}}
          style={{maxWidth: 600}}
        >
          <Form.Item label="Название мероприятия">
            <Input placeholder="input placeholder" onChange={addTitle}/>
          </Form.Item>
          <Form.Item label="Описание">
            <TextArea
              showCount
              onChange={addDescription}
              placeholder="disable resize"
              style={{ height: 120, resize: 'none' }}
            />
          </Form.Item>
          <Form.Item label="Дата начала">
            <DatePicker showTime onChange={addStartDateTime} />
          </Form.Item>
          <Form.Item label="Дата конца">
            <DatePicker showTime onChange={addEndDateTime} />
          </Form.Item>
          <Form.Item label="Ссылка на трансляцию">
            <Input placeholder="input placeholder" onChange={addUrl}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Events;
