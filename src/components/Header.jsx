import {Avatar, Dropdown, Layout} from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "@/assets/images/logo.png"
import {useGoogleLogin} from "@react-oauth/google";
import {AuthContext} from "@/contexts/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

const {Header} = Layout;

const AppHeader = () => {
  const { isLoggedIn, authData, login, logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  const getGoogleToken = useGoogleLogin({
    onSuccess: tokenResponse => {
      login(tokenResponse);
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const roleName = () => {
    switch (authData.privilege) {
      case 0:
        return 'Пользователь';
      case 1:
        return 'Организатор';
      case 2:
        return 'Админ';
    }
  }

  useEffect(() => {
    setItems([
      {
        label: isLoggedIn ? authData.first_name + ' ' + authData.last_name : 'Гостевой аккаунт',
        key: '0',
      },
      {
        label: isLoggedIn ? roleName() : 'Гость',
        key: '1',
      },
      {
        label: isLoggedIn ? <a onClick={() => logout()}>Выйти</a> :
          <a onClick={() => getGoogleToken()}>Войти через google</a>,
        key: '3',
      },
    ]);
  }, [isLoggedIn]);

  return (
    <Header className="header">
      <div className="header-logo">
        <Link to="/">
          <img className="header-logo__image" src={logo} alt="logo"/>
          <div className="header-logo__text">ByteBusters</div>
        </Link>
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
