import { Menu, Layout } from "antd";
import { BasicProps } from "antd/lib/layout/layout";

export const Header = (props: BasicProps) => {
  return (
    <Layout.Header {...props}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Layout.Header>
  );
};
