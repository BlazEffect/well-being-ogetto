import Calendar from "react-calendar";

import 'react-calendar/dist/Calendar.css';

const SideBar = ({selectedDate, setSelectedDate}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-calendar">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </div>
    </div>
  )
}

export default SideBar;
