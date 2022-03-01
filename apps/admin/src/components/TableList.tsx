import { Table } from "antd";
import { IntrospectionObjectType } from "graphql";
import { useDataProvider } from "hooks/DataProvider";
import { useEffect, useState } from "react";

export const TableList = (props: IntrospectionObjectType) => {
  const { fields = [] } = props;
  const [dataSource, setDataSource] = useState<any[]>([]);
  const dataProvider = useDataProvider();
  useEffect(() => {
    dataProvider
      .getList(props.name, {
        pagination: {
          page: 1,
          perPage: 20,
        },
        sort: {
          field: "created_at",
          order: "desc",
        },
        filter: {},
      })
      .then((res) => {
        setDataSource(res.data.map((item) => ({ ...item, key: item.id })));
      });
  }, []);
  return (
    <Table
      columns={fields.map((field) => ({
        title: field.name,
        dataIndex: field.name,
        key: field.name,
      }))}
      dataSource={dataSource}
    />
  );
};
