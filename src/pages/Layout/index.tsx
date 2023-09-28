import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { TeamOutlined } from "@ant-design/icons";

import styles from "./index.module.css";
import { Layout, Menu, theme } from "antd";

import { RouterConfig } from "@/routers";

const { Header, Content, Footer, Sider } = Layout;

function LayoutIndex() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  let { pathname } = useLocation();

  const getMenu: any = (RouterConfig: any) => {
    if (RouterConfig?.length === 0 || !RouterConfig) return null;

    let result: any = [];

    for (let i = 0; i < RouterConfig.length; i++) {
      const item = RouterConfig[i];
      if (item.hideInMenu && item.children) {
        result = [...result, ...getMenu(item.children)];
      } else if (item.hideInMenu) {
        continue;
      } else {
        result.push({
          key: item.path,
          icon: <TeamOutlined />,
          label: item.name,
          children: getMenu(item.children),
        });
      }
    }
    return result;
    // return RouterConfig?.map((item) => {
    //   if (item.hideInMenu) {
    //     return item.children ? getMenu(item.children) : null;
    //   } else {
    //     return {
    //       key: item.path,
    //       icon: <TeamOutlined />,
    //       label: item.name,
    //       children: getMenu(item.children),
    //     };
    //   }
    // });
    // return result
  };

  const menu = useMemo(() => {
    // return getMenu(RouterConfig)
    const res = getMenu(RouterConfig);
    console.log("res----", res);
    return res;
  }, [RouterConfig]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          mode="inline"
          onSelect={({ key }) => {
            console.log("key-----", key);
            navigate(key);
          }}
          items={menu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              marginTop: 16,
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Admin ©2023 Created by lceihen
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutIndex;
