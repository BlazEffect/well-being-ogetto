import {useRoutes} from 'react-router-dom';
import Logout from "@/pages/Auth/Logout.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Calendar from "@/pages/Calendar.jsx";
import Login from "@/pages/Auth/Login.jsx";

const AppRouter = () => {
  return useRoutes([
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/logout',
      element: <Logout/>,
    },
    {
      path: '/',
      element: <Calendar/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);
}

export default AppRouter;
