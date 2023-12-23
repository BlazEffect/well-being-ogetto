import {Layout, theme} from 'antd';
import AppHeader from "@/components/Header";
import AppRouter from "@/router/AppRouter";
import SideBar from "@/components/App/SideBar";
import {GoogleOAuthProvider} from "@react-oauth/google";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <SideBar/>
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
