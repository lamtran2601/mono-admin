import { Layout, Row, Table } from "antd";
import { BasicProps } from "antd/lib/layout/layout";
import { EditableTable } from "components/EditableTable";
import { useDataProvider } from "hooks/DataProvider";
import { Route, Routes } from "react-router-dom";

export const Content = (props: BasicProps) => {
  const { tables } = useDataProvider();

  return (
    <Layout.Content {...props}>
      <Row>
        <Routes>
          {tables.map((e) => (
            <Route
              key={e.name}
              path={`${e.name}`}
              element={<EditableTable key={e.name} {...e} />}
            />
          ))}
        </Routes>
      </Row>
    </Layout.Content>
  );
};

const List = (props: any) => {
  return <Table {...props} />;
};
