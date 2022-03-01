import { IntrospectionObjectType } from "graphql";
import { DataProvider } from "ra-core";
import { IntrospectionResult } from "ra-data-graphql";
import { createContext, useContext } from "react";

export interface IDataProvider extends DataProvider {
  tables: IntrospectionObjectType[];
  introspection?: IntrospectionResult;
}

// @ts-ignore
export const DataProviderContext = createContext<IDataProvider>(null);

export const useDataProvider = () => {
  return useContext(DataProviderContext);
};
