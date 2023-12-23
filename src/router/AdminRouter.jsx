import {useRoutes} from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Admin/Dashboard";
import Users from "@/pages/Admin/Users/Users";

const AdminRouter = () => {
  return useRoutes([
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
