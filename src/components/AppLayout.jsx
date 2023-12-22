import {Layout, theme} from 'antd';
import AppHeader from "@/components/Header";
import AppRouter from "@/router/AppRouter";
import SideBar from "@/components/SideBar";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <AppHeader/>

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
