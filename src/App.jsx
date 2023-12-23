import AppLayout from "@/components/App/AppLayout";
import AdminLayout from "@/components/Admin/AdminLayout";
import AuthProvider from "@/contexts/AuthContext";
import {useLocation} from "react-router-dom";

const App = () => {
  const location = useLocation();
  const isAdminPanelRoute = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {isAdminPanelRoute ? (
        <AdminLayout/>
      ) : (
        <AppLayout/>
      )}
    </AuthProvider>
  );
}

export default App;
