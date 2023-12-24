import {Avatar, Dropdown, Form, Input, Layout, Modal, notification, Select, Switch} from "antd";
import {UserOutlined} from "@ant-design/icons";
import logo from "@/assets/images/logo.png"
import {useGoogleLogin} from "@react-oauth/google";
import {AuthContext} from "@/contexts/AuthContext";
import {useCallback, useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

const {Header} = Layout;
const { TextArea } = Input;
const { Option } = Select;

const AppHeader = () => {
  const [form] = Form.useForm();
  const { isLoggedIn, authData, login, logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formType, setFormType] = useState(false);

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const getGoogleToken = useGoogleLogin({
    onSuccess: tokenResponse => {
      login(tokenResponse);
    },
    onError: errorResponse => console.log(errorResponse)
  });

  const handleModalOk = useCallback(() => {
    notification.config({
      duration: 2,
      maxCount: 2,
    });
    notification.success({
      message: 'Сообщение отправлено',
    });
    setTitle('');
    setEmail('');
    setDescription('');
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleModalCancel = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const addTitle = (value) => {
    setTitle(value.target.value);
  }

  const addEmail = (value) => {
    setEmail(value.target.value);
  }

  const addDescription = (value) => {
    setDescription(value.target.value);
  }

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
        label: <a onClick={() => setIsModalOpen(true)}>Обратная связь</a>,
        key: '2'
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

      <Modal
        title="Event Details"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div style={{
          display: 'flex',
          gap: "10px",
          marginBottom: "20px"
        }}>
          <div>Обратной связь</div>
          <Switch defaultChecked onChange={() => setFormType(!formType)} />
          <div>Вопрос-ответ</div>
        </div>

        {formType ? (
          <Form
            layout="vertical"
            form={form}
            initialValues={{layout: "vertical"}}
            style={{maxWidth: 600}}
          >
            <Form.Item label="Предложение">
              <Input placeholder="input placeholder" onChange={addTitle}/>
            </Form.Item>
            <Form.Item label="Описание предложения">
              <TextArea
                showCount
                onChange={addDescription}
                placeholder="disable resize"
                style={{height: 120, resize: 'none'}}
              />
            </Form.Item>
            <Form.Item label="Тип предложения">
              <Select>
                <Option value="idea">Идея</Option>
                <Option value="sovet">Совет</Option>
              </Select>
            </Form.Item>
          </Form>
          ) : (
          <Form
            layout="vertical"
            form={form}
            initialValues={{layout: "vertical"}}
            style={{maxWidth: 600}}
          >
            <Form.Item label="Тип предложения">
              <Select>
                <Option value="idea">Идея</Option>
                <Option value="sovet">Совет</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Описание предложения">
              <TextArea
                showCount
                onChange={addDescription}
                placeholder="disable resize"
                style={{height: 120, resize: 'none'}}
              />
            </Form.Item>
            <Form.Item label="Почта для обратной свзяи">
              <Input placeholder="input placeholder" onChange={addEmail}/>
            </Form.Item>
          </Form>
          )
        }
      </Modal>
    </Header>
  )
}

export default AppHeader;
