import { Row, Col } from "antd";
import { useState } from "react";

import { Header } from "./components/Header";
import { Sider } from "./components/Sider";
import { CustomBreadcrumb } from "./components/Breadcrumb";
import { Content } from "./components/Content";

export const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
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
