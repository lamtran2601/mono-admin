import { Menu, Layout } from "antd";
import { BasicProps } from "antd/lib/layout/layout";

export const Header = (props: BasicProps) => {
  return (
    <Layout.Header {...props}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ height: 55 }}
      >
        <Menu.Item key="1">DB1</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};
