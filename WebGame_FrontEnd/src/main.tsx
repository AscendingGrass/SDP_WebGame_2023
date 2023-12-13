import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DataProvider } from './DataContext';

import Error from "./Error.tsx"
import Home from './Home.tsx';
import LoginRegister from './LoginRegister.tsx';
import Login from './Login.tsx';
import Register from './Register.tsx';
import App from './App.tsx';
import Leaderboard from './Leaderboard.tsx';
import Homepage from './Homepage.tsx';
import News from './News.tsx';
import Setting from './Setting.tsx';
import User from './User.tsx';
import Report from './Report.tsx';

const router = createBrowserRouter([
  {
    path: "/", //Akses melalui base_url
    element: <Home/>,
    errorElement: <Error/>,
    children: [
      {
        path: '',
        element: <Homepage/>,
      },
      {
        path: "/login", //Akses melalui base_url/about
        element: <LoginRegister/>,
        children: [
          {
            index: true,
            element: <Login/>
          },
          {
            path: "register",
            element: <Register/>
          }
        ]
      },
      {
        path: "game", //Akses melalui base_url/about
        element: <App/>,
      },
      {
        path: "leaderboard", //Akses melalui base_url/about
        element: <Leaderboard/>,
      },
      {
        path: "news", //Akses melalui base_url/about
        element: <News/>,
      },
      {
        path: "setting", //Akses melalui base_url/about
        element: <Setting/>,
      },
      {
        path: "admin/user", //Akses melalui base_url/about
        element: <User/>,
      },
      {
        path: "admin/report", //Akses melalui base_url/about
        element: <Report/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
)
