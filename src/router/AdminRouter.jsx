import {useRoutes} from 'react-router-dom';
import Logout from "@/pages/Auth/Logout";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Admin/Dashboard";
import Users from "@/pages/Admin/Users/Users";

const AdminRouter = () => {
  return useRoutes([
    {
      path: '/logout',
      element: <Logout/>,
    },
    {
      path: '/admin',
      element: <Dashboard/>,
    },
    {
      path: '/admin/users',
      element: <Users/>,
    },
    {
      path: '/admin/events',
      element: <Users/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);
}

export default AdminRouter;
