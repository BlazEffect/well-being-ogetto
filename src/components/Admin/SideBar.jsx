import 'react-calendar/dist/Calendar.css';
import {Menu} from "antd";
import {CalendarOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const menuItems = [
  {
    key: 'users',
    icon: <UserOutlined/>,
    label: 'Пользователи',
  }
];

const SideBar = () => {
  return (
    <div className="sidebar">
      <Menu
        style={{
          height: '100%',
          borderRight: 0,
        }}
      >
        <Menu.Item key="users">
          <Link to="/admin/users">
            <UserOutlined/>
            Пользователи
          </Link>
        </Menu.Item>
        <Menu.Item key="events">
          <Link to="/admin/event">
            <CalendarOutlined />
            События
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default SideBar;
