import { Layout, Table } from "antd";
import { BasicProps } from "antd/lib/layout/layout";
import { TableList } from "components/TableList";
import { useDataProvider } from "hooks/DataProvider";
import { Route, Routes } from "react-router-dom";

export const Content = (props: BasicProps) => {
  const { tables } = useDataProvider();

  return (
    <Layout.Content {...props}>
      <Routes>
        {tables.map((e) => (
          <Route
            key={e.name}
            path={`${e.name}`}
            element={<TableList {...e} />}
          />
        ))}
      </Routes>
    </Layout.Content>
  );
};

const List = (props: any) => {
  return <Table {...props} />;
};
