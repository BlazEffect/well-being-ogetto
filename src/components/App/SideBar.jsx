import {useState} from "react";
import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';

const SideBar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="sidebar">
      <div className="sidebar-calendar">
        <Calendar
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default SideBar;
