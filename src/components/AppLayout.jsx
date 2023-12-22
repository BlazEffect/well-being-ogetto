import {Layout} from 'antd';
import AppHeader from "@/components/Header";

const AppLayout = () => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <AppHeader/>
    </Layout>
  )
}

export default AppLayout;
