import React from "react";
import { useEffect, useState } from "react";
import buildHasuraProvider from "ra-data-hasura";
import { Loading } from "../components/Loading";

export interface PaginatedParams {
  page?: number;
  perPage?: number;
  sort?: {
    field: string;
    order: string;
  };
  filter?: {};
}

export interface IDataProvider {
  getList: (
    resource: any,
    params: PaginatedParams
  ) => Promise<{ data: any[]; total: number }>;
  getOne: (resource: any, params: { id: any }) => Promise<{ data: any }>;
  getMany: (resource: any, params: { ids: any[] }) => Promise<{ data: any[] }>;
  getManyReference: (
    resource: any,
    params: { target: string; id: any } & PaginatedParams
  ) => Promise<{ data: any[]; total: number }>;
  create: (resource: any, params: any) => Promise<{ data: any }>;
  update: (
    resource: any,
    params: { id: string; data: any; previousData: any }
  ) => Promise<{ data: any }>;
  updateMany: (
    resource: any,
    params: { ids: any[]; data: any; previousData: any }
  ) => Promise<{ data: any[] }>;
  delete: (
    resource: any,
    params: { id: any; data: any }
  ) => Promise<{ data: any[] }>;
}

const HasuraContext = React.createContext<IDataProvider>({
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve({ data: {} }),
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  create: () => Promise.resolve({ data: {} }),
  update: () => Promise.resolve({ data: {} }),
  updateMany: () => Promise.resolve({ data: [] }),
  delete: () => Promise.resolve({ data: [] }),
});

enum FetchActions {
  GET_ONE = "GET_ONE",
  GET_LIST = "GET_LIST",
  GET_MANY = "GET_MANY",
  GET_MANY_REFERENCE = "GET_MANY_REFERENCE",
  DELETE = "DELETE",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  UPDATE_MANY = "UPDATE_MANY",
  DELETE_MANY = "DELETE_MANY",
}

type DataProviderFunc = (
  type: FetchActions,
  resource: string,
  params: any
) => Promise<any>;

export const HasuraProvider = (props: { children: any }) => {
  const { children } = props;

  const [dataProvider, setDataProvider] = useState<IDataProvider | undefined>();

  useEffect(() => {
    buildHasuraProvider({
      clientOptions: {
        uri: "http://localhost:8080/v1/graphql",
      },
    }).then((provider: DataProviderFunc) =>
      setDataProvider({
        getList: (resource: any, params: any) =>
          provider(FetchActions.GET_LIST, resource, params),
        getOne: (resource: any, params: any) =>
          provider(FetchActions.GET_ONE, resource, params),
        getMany: (resource: any, params: any) =>
          provider(FetchActions.GET_MANY, resource, params),
        getManyReference: (resource: any, params: any) =>
          provider(FetchActions.GET_MANY_REFERENCE, resource, params),
        create: (resource: any, params: any) =>
          provider(FetchActions.CREATE, resource, params),
        update: (resource: any, params: any) =>
          provider(FetchActions.UPDATE, resource, params),
        updateMany: (resource: any, params: any) =>
          provider(FetchActions.UPDATE_MANY, resource, params),
        delete: (resource: any, params: any) =>
          provider(FetchActions.DELETE, resource, params),
      })
    );
  }, []);

  if (!dataProvider) {
    return <Loading />;
  } else {
    try {
      dataProvider.getList("user", {}).then(console.log).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <HasuraContext.Provider value={dataProvider}>
      {children}
    </HasuraContext.Provider>
  );
};
