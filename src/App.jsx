import AppLayout from "@/components/App/AppLayout";
import AdminLayout from "@/components/Admin/AdminLayout";
import {useEffect, useState} from "react";
import AuthProvider from "@/contexts/AuthContext";

const App = () => {
  const [adminPanelRoutes, setAdminPanelRoutes] = useState(false);

  useEffect(() => {
    const url = location.pathname.split('/');

    if (url[1] === 'admin') {
      setAdminPanelRoutes(true);
    }
  }, []);

  return (
    <AuthProvider>
      {adminPanelRoutes ? (
        <AdminLayout/>
      ) : (
        <AppLayout/>
      )}
    </AuthProvider>
  );
}

export default App;
