import { useRoutes } from "react-router-dom";
import Layout from "@/pages/Layout";
import UserList from "@/pages/User/List";
import Client from "@/pages/Auth/Client";
import Callback from "@/pages/Auth/Callback";

export const RouterConfig = [
  {
    name: "首页",
    path: "/",
    element: <Layout />,
    hideInMenu: true,
    children: [
      {
        name: "用户管理",
        path: "/user",
        redirect: "/user/list",
        children: [
          {
            name: "用户列表",
            path: "/user/list",
            index: true,
            element: <UserList />,
          },
        ],
      },
      {
        name: "认证管理",
        path: "/auth",
        children: [
          {
            name: "client管理",
            path: "/auth/client",
            index: true,
            element: <Client />,
          },
          {
            name: "回调",
            path: "/auth/callback",
            hideInMenu: true,
            element: <Callback />,
          },
        ],
      },
    ],
  },
];
const RouterConfigElement = () => useRoutes(RouterConfig);
export default RouterConfigElement;
