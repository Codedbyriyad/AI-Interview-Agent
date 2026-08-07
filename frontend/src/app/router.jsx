import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import InterviewLayout from "../layouts/InterviewLayout";

import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Feedback from "../pages/Feedback";
import NotFound from "../pages/NotFound";

import { ROUTES } from "../constants/routes";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },

  {
    element: <InterviewLayout />,
    children: [
      {
        path: ROUTES.INTERVIEW,
        element: <Interview />,
      },
      {
        path: ROUTES.FEEDBACK,
        element: <Feedback />,
      },
    ],
  },
]);

export default router;