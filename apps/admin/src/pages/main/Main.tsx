import { Row, Col } from "antd";
import { useEffect, useState } from "react";

import { Header } from "./Header";
import { Sider } from "./Sider";
import { CustomBreadcrumb } from "./Breadcrumb";
import { Content } from "./Content/Content";
import { useDataProvider } from "hooks/DataProvider";

export const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dataProvider = useDataProvider();

  return (
    <>
      <Row>
        <Header
          className="header"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        />
      </Row>
      <Row style={{ marginTop: 64 }}>
        <Col>
          <Sider
            style={{
              paddingTop: "20px",
              overflow: "auto",
              position: "fixed",
              left: 0,
              top: 50,
              bottom: 0,
            }}
          />
        </Col>
        <Col style={{ marginLeft: "200px", padding: "0 24px" }}>
          <CustomBreadcrumb style={{ margin: "16px 0" }} />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: "initial",
            }}
          />
        </Col>
      </Row>
    </>
  );
};
