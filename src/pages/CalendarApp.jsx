import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import CustomWeekView from '@/components/App/CustomWeekView';
import {useParams} from 'react-router-dom';
import {Modal} from 'antd';
import 'moment-timezone';
import 'moment/locale/ru';
import moment from 'moment';
import events from '@/data/event';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.tz.setDefault('Europe/Moscow');
moment.locale('ru');
const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const {dateYear, dateMonth, dateDay} = useParams();

  const [myEvents, setEvents] = useState(events);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = useCallback(
    (event) => {
      setModalVisible(true);
      setSelectedEvent(event);
    },
    [setModalVisible, setSelectedEvent]
  );

  const handleNavigate = useCallback(
    (newDate) => {
      setDefaultDate(newDate);
    },
    [setDefaultDate]
  );

  const handleModalOk = useCallback(() => {
    // Обработка подтверждения модального окна
    setModalVisible(false);
  }, [setModalVisible]);

  const handleModalCancel = useCallback(() => {
    // Обработка закрытия модального окна
    setModalVisible(false);
  }, [setModalVisible]);


  useEffect(() => {
    if (dateYear && dateMonth && dateDay) {
      setDefaultDate(new Date(dateYear, dateMonth - 1, dateDay));
    }
  }, [dateYear, dateMonth, dateDay]);

  const {scrollToTime} = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const {views} = useMemo(() => ({
    views: {
      month: false,
      week: CustomWeekView,
      day: false,
    },
  }), []);

  return (
    <div>
      <Calendar
        date={defaultDate}
        onNavigate={handleNavigate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        scrollToTime={scrollToTime}
        views={views}
      />

      {/* Модальное окно */}
      <Modal
        title="Event Details"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <label>
          Заголовок: <input name="title" value={selectedEvent?.title}/>
        </label>
        <br/>
        <label>
          Описание: <input name="description" value={selectedEvent?.description}/>
        </label>
        <br/>
        <label>
          Начало: {moment(selectedEvent?.start).format('LLL')}
        </label>
        <br/>
        <label>
          Окончание: {moment(selectedEvent?.end).format('LLL')}
        </label>
      </Modal>
    </div>
  );
};

export default CalendarApp;
