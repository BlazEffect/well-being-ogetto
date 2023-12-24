import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Event = () => {
  const {eventId} = useParams();

  const [url, setUrl] = useState('');

  useEffect(() => {

  }, []);

  return (
    <div>
      <iframe width="1902" height="781" src="https://www.youtube.com/embed/Z_FZh-P8c54"
              title="Усмирение Робота на Opel Astra H! Епучая Молния №1" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
      </iframe>
    </div>
  )
}

export default Event;
