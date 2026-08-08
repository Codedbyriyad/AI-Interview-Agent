import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Feedback from "../pages/Feedback";
import History from "../pages/History";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "interview",
        element: <Interview />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;