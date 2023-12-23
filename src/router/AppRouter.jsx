import {useRoutes} from 'react-router-dom';
import Logout from "@/pages/Auth/Logout";
import NotFound from "@/pages/NotFound";
import CalendarApp from "@/pages/CalendarApp";
import Login from "@/pages/Auth/Login";

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
      path: '/:dateYear?/:dateMonth?/:dateDay?',
      element: <CalendarApp/>,
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);
}

export default AppRouter;
