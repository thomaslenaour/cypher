/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'mutation Follow($followed: String!) {\n  follow(followed: $followed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}\n\nmutation Unfollow($unfollowed: String!) {\n  unfollow(unfollowed: $unfollowed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}':
    types.FollowDocument,
  'mutation ToggleMyselfFromQueue($data: ToggleMyselfFromQueueInput!) {\n  toggleMyselfFromQueue(data: $data)\n}\n\nmutation JoinPublicRoom($roomId: String!) {\n  joinPublicRoom(data: {roomId: $roomId})\n}\n\nmutation JoinRoom($roomId: String!) {\n  joinRoom(data: {roomId: $roomId})\n}\n\nmutation StartPublishing($data: StartStopPublishingInput!) {\n  startPublishing(data: $data)\n}\n\nmutation StopPublishing($data: StartStopPublishingInput!) {\n  stopPublishing(data: $data)\n}':
    types.ToggleMyselfFromQueueDocument,
  'mutation UpdateUserProfile($data: UpdateUserProfileInput!) {\n  updateUserProfile(data: $data) {\n    userName\n    punchline\n  }\n}':
    types.UpdateUserProfileDocument,
  'query GetRooms {\n  rooms {\n    id\n    name\n    participantsNumber\n  }\n}':
    types.GetRoomsDocument,
  'query GetTest {\n  test\n}': types.GetTestDocument,
  'query getUserProfile($key: String!, $value: String!) {\n  userProfile(key: $key, value: $value) {\n    id\n    createdAt\n    bannerUrl\n    profileUrl\n    pseudo\n    punchline\n    userName\n    userId\n  }\n}':
    types.GetUserProfileDocument,
  'query getUser($key: String!, $value: String!) {\n  user(key: $key, value: $value) {\n    id\n    followedBy {\n      id\n    }\n  }\n}':
    types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation Follow($followed: String!) {\n  follow(followed: $followed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}\n\nmutation Unfollow($unfollowed: String!) {\n  unfollow(unfollowed: $unfollowed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}'
): (typeof documents)['mutation Follow($followed: String!) {\n  follow(followed: $followed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}\n\nmutation Unfollow($unfollowed: String!) {\n  unfollow(unfollowed: $unfollowed) {\n    id\n    followedBy {\n      id\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation ToggleMyselfFromQueue($data: ToggleMyselfFromQueueInput!) {\n  toggleMyselfFromQueue(data: $data)\n}\n\nmutation JoinPublicRoom($roomId: String!) {\n  joinPublicRoom(data: {roomId: $roomId})\n}\n\nmutation JoinRoom($roomId: String!) {\n  joinRoom(data: {roomId: $roomId})\n}\n\nmutation StartPublishing($data: StartStopPublishingInput!) {\n  startPublishing(data: $data)\n}\n\nmutation StopPublishing($data: StartStopPublishingInput!) {\n  stopPublishing(data: $data)\n}'
): (typeof documents)['mutation ToggleMyselfFromQueue($data: ToggleMyselfFromQueueInput!) {\n  toggleMyselfFromQueue(data: $data)\n}\n\nmutation JoinPublicRoom($roomId: String!) {\n  joinPublicRoom(data: {roomId: $roomId})\n}\n\nmutation JoinRoom($roomId: String!) {\n  joinRoom(data: {roomId: $roomId})\n}\n\nmutation StartPublishing($data: StartStopPublishingInput!) {\n  startPublishing(data: $data)\n}\n\nmutation StopPublishing($data: StartStopPublishingInput!) {\n  stopPublishing(data: $data)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation UpdateUserProfile($data: UpdateUserProfileInput!) {\n  updateUserProfile(data: $data) {\n    userName\n    punchline\n  }\n}'
): (typeof documents)['mutation UpdateUserProfile($data: UpdateUserProfileInput!) {\n  updateUserProfile(data: $data) {\n    userName\n    punchline\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetRooms {\n  rooms {\n    id\n    name\n    participantsNumber\n  }\n}'
): (typeof documents)['query GetRooms {\n  rooms {\n    id\n    name\n    participantsNumber\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetTest {\n  test\n}'
): (typeof documents)['query GetTest {\n  test\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query getUserProfile($key: String!, $value: String!) {\n  userProfile(key: $key, value: $value) {\n    id\n    createdAt\n    bannerUrl\n    profileUrl\n    pseudo\n    punchline\n    userName\n    userId\n  }\n}'
): (typeof documents)['query getUserProfile($key: String!, $value: String!) {\n  userProfile(key: $key, value: $value) {\n    id\n    createdAt\n    bannerUrl\n    profileUrl\n    pseudo\n    punchline\n    userName\n    userId\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query getUser($key: String!, $value: String!) {\n  user(key: $key, value: $value) {\n    id\n    followedBy {\n      id\n    }\n  }\n}'
): (typeof documents)['query getUser($key: String!, $value: String!) {\n  user(key: $key, value: $value) {\n    id\n    followedBy {\n      id\n    }\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
