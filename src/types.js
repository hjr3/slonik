// @flow

/* eslint-disable no-use-before-define */

// eslint-disable-next-line flowtype/no-weak-types
type InternalDatabaseConnectionType = any;

export type DatabaseConnectionUriType = string;

export type ClientErrorsConfigurationType = {|
  +NotFoundError?: Class<Error>
|};

export type ClientConfigurationType = {
  +errors?: ClientErrorsConfigurationType
};

export type DatabaseConfigurationType = DatabaseConnectionUriType |
  {|
    +database?: string,
    +host?: string,
    +idleTimeoutMillis?: number,
    +max?: number,
    +password?: string,
    +port?: number,
    +user?: string
  |};

export type DatabaseSingleConnectionType = {
  end: () => Promise<void>
} & DatabaseConnectionType;

export type DatabaseConnectionType = {
  +any: QueryAnyType<*>,
  +many: QueryManyType<*>,
  +maybeOne: QueryMaybeOneType<*>,
  +one: QueryOneType<*>,
  +query: QueryType<*>
};

export type DatabasePoolConnectionType = DatabaseConnectionType & {
  +release: () => Promise<void>
};

export type DatabasePoolType = DatabaseConnectionType & {
  +connect: () => Promise<DatabasePoolConnectionType>
};

export type QueryResultRowType = {
  [key: string]: string | number
};

export type NormalizedQueryType = {|
  +sql: string,
  +values: $ReadOnlyArray<*>
|};

type QueryPrimitiveValueType = string | number | null;

// eslint-disable-next-line flowtype/generic-spacing
export type AnonymouseValuePlaceholderValuesType = $ReadOnlyArray<

    // INSERT ... VALUES ? => INSERT ... VALUES (1, 2, 3); [[1, 2, 3]]
    // INSERT ... VALUES ? => INSERT ... VALUES (1), (2), (3); [[[1], [2], [3]]]
    $ReadOnlyArray<QueryPrimitiveValueType | $ReadOnlyArray<QueryPrimitiveValueType>> |
    QueryPrimitiveValueType
  >;

export type NamedValuePlaceholderValuesType = {
  +[key: string]: string | number | null
};

export type DatabaseQueryValuesType =
  AnonymouseValuePlaceholderValuesType |
  NamedValuePlaceholderValuesType;

export type InternalQueryAnyType = (
  connection: InternalDatabaseConnectionType,
  clientConfiguration: ClientConfigurationType,
  sql: string,
  values?: DatabaseQueryValuesType
) => Promise<$ReadOnlyArray<QueryResultRowType>>;

export type InternalQueryManyType = (
  connection: InternalDatabaseConnectionType,
  clientConfiguration: ClientConfigurationType,
  sql: string,
  values?: DatabaseQueryValuesType
) => Promise<$ReadOnlyArray<QueryResultRowType>>;

export type InternalQueryMaybeOneType = (
  connection: InternalDatabaseConnectionType,
  clientConfiguration: ClientConfigurationType,
  sql: string,
  values?: DatabaseQueryValuesType
) => Promise<QueryResultRowType | null>;

export type InternalQueryOneType = (
  connection: InternalDatabaseConnectionType,
  clientConfiguration: ClientConfigurationType,
  sql: string,
  values?: DatabaseQueryValuesType
) => Promise<QueryResultRowType>;

// eslint-disable-next-line flowtype/no-weak-types
export type InternalQueryType = (connection: InternalDatabaseConnectionType, sql: string, values?: DatabaseQueryValuesType) => Promise<any>;

export type QueryAnyType<T: QueryResultRowType> = (sql: string, values?: DatabaseQueryValuesType) => Promise<$ReadOnlyArray<T>>;
export type QueryManyType<T: QueryResultRowType> = (sql: string, values?: DatabaseQueryValuesType) => Promise<$ReadOnlyArray<T>>;
export type QueryMaybeOneType<T: QueryResultRowType | null> = (sql: string, values?: DatabaseQueryValuesType) => Promise<T>;
export type QueryOneType<T: QueryResultRowType> = (sql: string, values?: DatabaseQueryValuesType) => Promise<T>;
export type QueryType<T: QueryResultRowType> = (sql: string, values?: DatabaseQueryValuesType) => Promise<$ReadOnlyArray<T>>;
