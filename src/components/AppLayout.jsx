import AppRouter from "@/router/AppRouter.jsx";
import {Layout} from "antd";

const AppLayout = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <AppRouter/>
      </Content>
    </Layout>
  )
}

export default AppLayout;
