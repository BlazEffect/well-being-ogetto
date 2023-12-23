import {Layout, theme} from 'antd';
import AppHeader from "@/components/Header";
import AppRouter from "@/router/AppRouter";
import SideBar from "@/components/App/SideBar";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const date = moment(selectedDate).format("YYYY-MM-DD").split('-');

    navigate(`/${date[0]}/${date[1]}/${date[2]}`);
  }, [selectedDate]);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <GoogleOAuthProvider clientId="646137288373-6ldva045om0cl6p9bijei4o62qhbrtq1.apps.googleusercontent.com">
        <AppHeader/>
      </GoogleOAuthProvider>

      <Layout>
        <Sider
          width={250}
          style={{
            margin: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <SideBar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Sider>

        <Layout style={{padding: '24px'}}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <AppRouter/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout;
