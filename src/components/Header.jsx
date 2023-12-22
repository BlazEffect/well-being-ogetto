import {Avatar, Layout} from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "@/assets/images/logo.png"

const {Header} = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="header-logo">
        <img className="header-logo__image" src={logo} alt="logo"/>
      </div>

      <div className="header-avatar">
        <Avatar size={45} icon={<UserOutlined />} />
      </div>
    </Header>
  )
}

export default AppHeader;
