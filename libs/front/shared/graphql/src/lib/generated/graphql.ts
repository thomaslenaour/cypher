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
  joinPublicRoom: Scalars['String']['output'];
  joinRoom: Scalars['String']['output'];
  startPublishing: Scalars['Boolean']['output'];
  toggleMyselfFromQueue: Scalars['Boolean']['output'];
};

export type MutationJoinPublicRoomArgs = {
  data: JoinRoomInput;
};

export type MutationJoinRoomArgs = {
  data: JoinRoomInput;
};

export type MutationStartPublishingArgs = {
  data: StartPublishingInput;
};

export type MutationToggleMyselfFromQueueArgs = {
  data: ToggleMyselfFromQueueInput;
};

export type Query = {
  __typename?: 'Query';
  rooms: Array<RoomObjectType>;
  test: Scalars['String']['output'];
};

export type RoomObjectType = {
  __typename?: 'RoomObjectType';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  participantsNumber: Scalars['Float']['output'];
};

export type StartPublishingInput = {
  identity: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type ToggleMyselfFromQueueInput = {
  identity: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type ToggleMyselfFromQueueMutationVariables = Exact<{
  data: ToggleMyselfFromQueueInput;
}>;

export type ToggleMyselfFromQueueMutation = {
  __typename?: 'Mutation';
  toggleMyselfFromQueue: boolean;
};

export type JoinPublicRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;

export type JoinPublicRoomMutation = {
  __typename?: 'Mutation';
  joinPublicRoom: string;
};

export type JoinRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;

export type JoinRoomMutation = { __typename?: 'Mutation'; joinRoom: string };

export type StartPublishingMutationVariables = Exact<{
  data: StartPublishingInput;
}>;

export type StartPublishingMutation = {
  __typename?: 'Mutation';
  startPublishing: boolean;
};

export type GetRoomsQueryVariables = Exact<{ [key: string]: never }>;

export type GetRoomsQuery = {
  __typename?: 'Query';
  rooms: Array<{
    __typename?: 'RoomObjectType';
    id: string;
    name: string;
    participantsNumber: number;
  }>;
};

export type GetTestQueryVariables = Exact<{ [key: string]: never }>;

export type GetTestQuery = { __typename?: 'Query'; test: string };

export const ToggleMyselfFromQueueDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ToggleMyselfFromQueue' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ToggleMyselfFromQueueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'toggleMyselfFromQueue' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ToggleMyselfFromQueueMutation,
  ToggleMyselfFromQueueMutationVariables
>;
export const JoinPublicRoomDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'JoinPublicRoom' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'roomId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'joinPublicRoom' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'roomId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'roomId' },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  JoinPublicRoomMutation,
  JoinPublicRoomMutationVariables
>;
export const JoinRoomDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'JoinRoom' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'roomId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'joinRoom' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'roomId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'roomId' },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JoinRoomMutation, JoinRoomMutationVariables>;
export const StartPublishingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'StartPublishing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'StartPublishingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'startPublishing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StartPublishingMutation,
  StartPublishingMutationVariables
>;
export const GetRoomsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetRooms' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rooms' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'participantsNumber' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRoomsQuery, GetRoomsQueryVariables>;
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
