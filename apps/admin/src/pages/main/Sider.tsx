import { Menu, Layout, SiderProps } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useDataProvider } from "hooks/DataProvider";

export const Sider = (props: SiderProps) => {
  const { tables } = useDataProvider();
  const location = useLocation();

  const selectedKey = location.pathname.split("/")[1];
  return (
    <Layout.Sider {...props}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ height: "100%", borderRight: 1 }}
      >
        {tables.map((e) => (
          <Menu.Item key={e.name} icon={<DatabaseOutlined />}>
            <Link to={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};
