/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type JoinRoomInput = {
  roomId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  joinRoom: Scalars['String']['output'];
};

export type MutationJoinRoomArgs = {
  data: JoinRoomInput;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String']['output'];
};

export type GetTestQueryVariables = Exact<{ [key: string]: never }>;

export type GetTestQuery = { __typename?: 'Query'; test: string };

export const GetTestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTest' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'test' } }],
      },
    },
  ],
} as unknown as DocumentNode<GetTestQuery, GetTestQueryVariables>;
