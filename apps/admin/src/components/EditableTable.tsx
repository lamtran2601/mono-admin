import { clearCache, useAntdTable } from "ahooks";
import { Form, FormInstance, Input, Table } from "antd";
import { IntrospectionObjectType } from "graphql";
import { useDataProvider } from "hooks/DataProvider";
import React, { useContext, useEffect, useRef, useState } from "react";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const EditableTable = (props: IntrospectionObjectType) => {
  const { fields = [] } = props;
  const dataProvider = useDataProvider();

  const { tableProps, search, params } = useAntdTable(
    (params) =>
      dataProvider
        .getList(props.name, {
          pagination: {
            page: params.current,
            perPage: params.pageSize,
          },
          sort: {
            field: "created_at",
            order: "desc",
          },
          filter: {},
        })
        .then((e) => ({
          list: e.data.map((e) => ({ ...e, key: e.id })),
          total: e.total,
        })),
    {
      defaultParams: [
        {
          current: 1,
          pageSize: 10,
          sorter: {
            field: "created_at",
            order: "desc",
          },
        },
      ],
      cacheKey: props.name,
    }
  );

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row: any) => {
    const newData = [...tableProps.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    tableProps.dataSource = newData;
  };

  return (
    <Table
      components={components}
      columns={
        fields.map((field) => ({
          title: field.name,
          dataIndex: field.name,
          key: field.name,
          onCell: (record) => ({
            record,
            editable: true,
            dataIndex: field.name,
            title: field.name,
            handleSave,
          }),
        })) as ColumnTypes
      }
      {...tableProps}
    />
  );
};

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
