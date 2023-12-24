import {useRoutes} from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import CalendarApp from "@/pages/CalendarApp";
import Event from "@/pages/Event";
import Login from "@/pages/Auth/Login";

const AppRouter = () => {
  return useRoutes([
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/calendar/:dateYear/:dateMonth/:dateDay',
      element: <CalendarApp/>,
    },
    {
      path: '/event/:eventId',
      element: <Event/>
    },
    {
      path: '*',
      element: <NotFound/>,
    },
  ]);
}

export default AppRouter;
