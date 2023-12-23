import {Layout, theme} from "antd";
import AppHeader from "@/components/Header";
import SideBar from "@/components/App/SideBar";
import AdminRouter from "@/router/AdminRouter";
import {useContext} from "react";
import {AuthContext} from "@/contexts/AuthContext.jsx";

const { Content, Sider } = Layout;

const AdminLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

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
            {isLoggedIn ? (
              <AdminRouter/>
            ) : (
              <div>
                Вы не авторизированны, чтобы зайти в панель администратора
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AdminLayout;
