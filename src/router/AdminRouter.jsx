import {useRoutes} from 'react-router-dom';
import Logout from "@/pages/Auth/Logout";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Admin/Dashboard";

const AdminRouter = () => {
  return useRoutes([
    {
      path: '/logout',
      element: <Logout/>,
    },
    {
      path: '/',
      element: <Dashboard/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);
}

export default AdminRouter;
