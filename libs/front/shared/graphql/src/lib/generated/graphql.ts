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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type JoinRoomInput = {
  roomId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  follow: UserObjectType;
  joinPublicRoom: Scalars['String']['output'];
  joinRoom: Scalars['String']['output'];
  startPublishing: Scalars['Boolean']['output'];
  stopPublishing: Scalars['Boolean']['output'];
  toggleMyselfFromQueue: Scalars['Boolean']['output'];
  unfollow: UserObjectType;
};

export type MutationFollowArgs = {
  followed: Scalars['String']['input'];
  following: Scalars['String']['input'];
};

export type MutationJoinPublicRoomArgs = {
  data: JoinRoomInput;
  follow: UserObjectType;
  joinRoom: Scalars['String']['output'];
  unfollow: UserObjectType;
};

export type MutationFollowArgs = {
  followed: Scalars['String']['input'];
  following: Scalars['String']['input'];
};

export type MutationUnfollowArgs = {
  unfollowed: Scalars['String']['input'];
  unfollowing: Scalars['String']['input'];
};

export type MutationJoinRoomArgs = {
  data: JoinRoomInput;
};

export type MutationStartPublishingArgs = {
  data: StartStopPublishingInput;
};

export type MutationStopPublishingArgs = {
  data: StartStopPublishingInput;
};

export type MutationToggleMyselfFromQueueArgs = {
  data: ToggleMyselfFromQueueInput;
};

export type MutationUnfollowArgs = {
  unfollowed: Scalars['String']['input'];
  unfollowing: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  rooms: Array<RoomObjectType>;
  test: Scalars['String']['output'];
  user: UserObjectType;
  userProfile: UserProfileObjectType;
};

export type QueryUserProfileArgs = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type RoomObjectType = {
  __typename?: 'RoomObjectType';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  participantsNumber?: Maybe<Scalars['Float']['output']>;
};

export type StartStopPublishingInput = {
  identity: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type ToggleMyselfFromQueueInput = {
  identity: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  followedBy?: Maybe<Array<UserObjectType>>;
  following?: Maybe<Array<UserObjectType>>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile: UserProfileObjectType;
};

export type UserProfileObjectType = {
  __typename?: 'UserProfileObjectType';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  pseudo: Scalars['String']['output'];
  punchline?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
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
  data: StartStopPublishingInput;
}>;

export type StartPublishingMutation = {
  __typename?: 'Mutation';
  startPublishing: boolean;
};

export type StopPublishingMutationVariables = Exact<{
  data: StartStopPublishingInput;
}>;

export type StopPublishingMutation = {
  __typename?: 'Mutation';
  stopPublishing: boolean;
};

export type GetRoomsQueryVariables = Exact<{ [key: string]: never }>;

export type GetRoomsQuery = {
  __typename?: 'Query';
  rooms: Array<{
    __typename?: 'RoomObjectType';
    id: string;
    name: string;
    participantsNumber?: number | null;
  }>;
};

export type GetTestQueryVariables = Exact<{ [key: string]: never }>;
export type UserObjectType = {
  __typename?: 'UserObjectType';
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  followedBy?: Maybe<Array<UserObjectType>>;
  following?: Maybe<Array<UserObjectType>>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile: UserProfileObjectType;
};

export type UserProfileObjectType = {
  __typename?: 'UserProfileObjectType';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  profileUrl?: Maybe<Scalars['String']['output']>;
  pseudo: Scalars['String']['output'];
  punchline?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

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
              name: { kind: 'Name', value: 'StartStopPublishingInput' },
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

export type GetTestQuery = { __typename?: 'Query'; test: string };

export type GetUserProfileQueryVariables = Exact<{
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;

export type GetUserProfileQuery = {
  __typename?: 'Query';
  userProfile: {
    __typename?: 'UserProfileObjectType';
    id: string;
    bannerUrl?: string | null;
    profileUrl?: string | null;
    pseudo: string;
    punchline?: string | null;
    userId: string;
  };
};

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
export const GetUserProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'key' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'value' },
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
            name: { kind: 'Name', value: 'userProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'key' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'key' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'value' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'value' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bannerUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pseudo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'punchline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export type GetUserProfileQuery = {
  __typename?: 'Query';
  userProfile: {
    __typename?: 'UserProfileObjectType';
    id: string;
    createdAt: any;
    bannerUrl?: string | null;
    profileUrl?: string | null;
    pseudo: string;
    punchline?: string | null;
    userId: string;
  };
};

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
export const GetUserProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'key' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'value' },
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
            name: { kind: 'Name', value: 'userProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'key' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'key' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'value' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'value' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bannerUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'profileUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pseudo' } },
                { kind: 'Field', name: { kind: 'Name', value: 'punchline' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
