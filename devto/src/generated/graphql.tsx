import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type LoginInputType = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  register: User,
  login: LoginResponse,
  revokeRefreshToken: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  data: RegisterInputType
};


export type MutationLoginArgs = {
  data: LoginInputType
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  me: Scalars['String'],
};

export type RegisterInputType = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  joinedDate: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  workPlace: Scalars['String'],
  about: Scalars['String'],
  linkedIn: Scalars['String'],
  github: Scalars['String'],
  tags: Array<Scalars['String']>,
  joinedDate: Scalars['String'],
  location: Scalars['String'],
  isActive: Scalars['Boolean'],
};

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;