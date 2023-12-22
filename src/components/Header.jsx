import {Avatar, Dropdown, Layout} from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "@/assets/images/logo.png"

const {Header} = Layout;

const items = [
  {
    label: 'Anonymous user',
    key: '0',
  },
  {
    label: 'Гость',
    key: '1',
  },
  {
    label: 'Войти через google',
    key: '3',
  },
];

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="header-logo">
        <img className="header-logo__image" src={logo} alt="logo"/>
      </div>

      <div className="header-avatar">
        <Dropdown
          menu={{items}}
          trigger={['click']}
          arrow
        >
          <a onClick={(e) => e.preventDefault()}>
            <Avatar size={40} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}

export default AppHeader;
