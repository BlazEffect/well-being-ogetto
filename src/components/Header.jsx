import {Avatar, Dropdown, Layout} from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "@/assets/images/logo.png"
import {useGoogleLogin} from "@react-oauth/google";

const {Header} = Layout;

const AppHeader = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
    onError: errorResponse => console.log(errorResponse)
  });

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
      label: <a onClick={() => login()}>Войти через google</a>,
      key: '3',
    },
  ];

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
