import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Feedback from "../pages/Feedback";
import History from "../pages/History";
import NotFound from "../pages/NotFound";
import HistoryDetails from "../pages/HistoryDetails";
import Dashboard from "../pages/Dashboard";

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
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
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
      {
        path: "history",
        element: <History />,
      },
      {
        path: "history/:id",
        element: <HistoryDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
