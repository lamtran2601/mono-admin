import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
);
