import { useEffect, useState } from "react";
import buildHasuraProvider from "ra-data-hasura";
import { Loading } from "../components/Loading";
import { IDataProvider, DataProviderContext } from "./DataProvider";
import { IntrospectionObjectType } from "graphql";
import { IntrospectionResult } from "ra-data-graphql";

export const HasuraProvider = (props: { children: any }) => {
  const [dataProvider, setDataProvider] = useState<IDataProvider | undefined>();

  const [introspection, setIntrospection] = useState<IntrospectionResult>();
  const [tables, setTables] = useState<IntrospectionObjectType[]>([]);

  useEffect(() => {
    buildHasuraProvider(
      {
        clientOptions: {
          uri: "http://localhost:8080/v1/graphql",
        },
      },
      {
        callbackCustomBuildGqlQuery: (e: any) => {
          if (!introspection) {
            setIntrospection(e);
          }
        },
      }
    ).then((provider: any) => {
      if (!introspection) {
        provider.getList("user", {
          pagination: { page: 1, perPage: 20 },
          sort: { field: "created_at", order: "asc" },
          filter: {},
        });
      }
      setDataProvider(provider);
    });
  }, []);

  useEffect(() => {
    if (tables.length === 0 && introspection) {
      const { resources: _resources } = introspection;
      const _tables = _resources
        .map((e) => e.type)
        .filter((resource: any) => resource.description.startsWith("columns"));
      setTables(_tables);
    }
  }, [introspection]);

  if (!dataProvider || tables.length === 0) {
    return <Loading />;
  }

  return (
    <DataProviderContext.Provider
      value={{ ...dataProvider, introspection, tables }}
    >
      {props.children}
    </DataProviderContext.Provider>
  );
};
