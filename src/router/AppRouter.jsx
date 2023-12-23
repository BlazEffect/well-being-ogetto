import {useRoutes} from 'react-router-dom';
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
