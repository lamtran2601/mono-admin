import { Breadcrumb, BreadcrumbProps } from "antd";

export const CustomBreadcrumb = (props: BreadcrumbProps) => {
  return (
    <Breadcrumb {...props}>
      <Breadcrumb.Item>Main</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  );
};
