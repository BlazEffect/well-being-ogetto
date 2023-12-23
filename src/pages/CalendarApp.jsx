import {useState, useCallback, useMemo, useEffect} from 'react'
import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import CustomWeekView from "@/components/App/CustomWeekView";
import {useParams} from "react-router-dom";
import 'moment-timezone'
import 'moment/locale/ru';
import moment from 'moment'
import events from '@/data/event'
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.tz.setDefault('Europe/Moscow');
moment.locale('ru');
const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const {dateYear, dateMonth, dateDay} = useParams();

  const [myEvents, setEvents] = useState(events);
  const [defaultDate, setDefaultDate] = useState(new Date());

  const handleSelectSlot = useCallback(
    ({start, end}) => {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, {start, end, title}]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  useEffect(() => {
    if (dateYear && dateMonth && dateDay) {
      setDefaultDate(new Date(dateYear, dateMonth - 1, dateDay));
    }
  }, [dateYear, dateMonth, dateDay]);

  const { scrollToTime} = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const {views} = useMemo(() => ({
    views: {
      month: false,
      week: CustomWeekView,
      day: false
    },
  }), []);

  return (
    <div>
      <Calendar
        date={defaultDate}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        views={views}
      />
    </div>
  )
}

export default CalendarApp;
