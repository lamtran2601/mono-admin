import { Menu, Layout, SiderProps } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";

export const Sider = (props: SiderProps) => {
  return (
    <Layout.Sider {...props}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 1 }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          User
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
