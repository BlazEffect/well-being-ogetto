import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as eventService from "@/services/EventService.jsx";

const Event = () => {
  const {eventId} = useParams();

  const [dataEvent, setDataEvent] = useState('');

  useEffect(() => {
    fetchData(eventId);
  }, []);

  const fetchData = async (eventId) => {
    const event = await eventService.getEventById(eventId);

    setDataEvent(event.url);
  }

  return (
    <div>
      dangerouslySetInnerHTML={{__html: dataEvent}}
    </div>
  )
}

export default Event;
