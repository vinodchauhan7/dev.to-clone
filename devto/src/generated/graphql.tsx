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
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  register: User,
  login: LoginResponse,
  revokeRefreshToken: Scalars['Boolean'],
  logout: Scalars['Boolean'],
  post: Post,
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


export type MutationPostArgs = {
  data: PostInput
};

export type Post = {
   __typename?: 'Post',
  postId: Scalars['Float'],
  title: Scalars['String'],
  description: Scalars['String'],
  tags: Array<Scalars['String']>,
  creationDate: Scalars['String'],
  views: Scalars['Float'],
  isPublished: Scalars['Boolean'],
  user: User,
};

export type PostInput = {
  title: Scalars['String'],
  description: Scalars['String'],
  tags: Array<Scalars['String']>,
  creationDate: Scalars['String'],
  views: Scalars['Float'],
  isPublished: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  getUser: User,
  allUser: Array<User>,
  me: User,
  getAllPostById: Array<Post>,
  getPostById: Post,
  getAllPost: Array<Post>,
};


export type QueryGetUserArgs = {
  userId: Scalars['Float']
};


export type QueryGetAllPostByIdArgs = {
  userId: Scalars['Float']
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Float']
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
  posts: Array<Post>,
};

export type AllUserQueryVariables = {};


export type AllUserQuery = (
  { __typename?: 'Query' }
  & { allUser: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);

export type GetAllPostQueryVariables = {};


export type GetAllPostQuery = (
  { __typename?: 'Query' }
  & { getAllPost: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'description' | 'postId' | 'tags' | 'creationDate' | 'views' | 'isPublished'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  )> }
);

export type GetAllPostByIdQueryVariables = {
  userId: Scalars['Float']
};


export type GetAllPostByIdQuery = (
  { __typename?: 'Query' }
  & { getAllPostById: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'postId' | 'title' | 'creationDate' | 'tags'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'email' | 'id'>
    ) }
  )> }
);

export type GetUserQueryVariables = {
  userId: Scalars['Float']
};


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'joinedDate'>
  ) }
);

export type LoginMutationVariables = {
  data: LoginInputType
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'name' | 'joinedDate'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'joinedDate'>
  ) }
);

export type PostMutationVariables = {
  data: PostInput
};


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'postId' | 'title'>
  ) }
);

export type RegisterMutationVariables = {
  data: RegisterInputType
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


export const AllUserDocument = gql`
    query AllUser {
  allUser {
    id
    name
    email
  }
}
    `;

/**
 * __useAllUserQuery__
 *
 * To run a query within a React component, call `useAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllUserQuery, AllUserQueryVariables>) {
        return ApolloReactHooks.useQuery<AllUserQuery, AllUserQueryVariables>(AllUserDocument, baseOptions);
      }
export function useAllUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllUserQuery, AllUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllUserQuery, AllUserQueryVariables>(AllUserDocument, baseOptions);
        }
export type AllUserQueryHookResult = ReturnType<typeof useAllUserQuery>;
export type AllUserLazyQueryHookResult = ReturnType<typeof useAllUserLazyQuery>;
export type AllUserQueryResult = ApolloReactCommon.QueryResult<AllUserQuery, AllUserQueryVariables>;
export const GetAllPostDocument = gql`
    query GetAllPost {
  getAllPost {
    title
    description
    postId
    tags
    creationDate
    views
    isPublished
    user {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useGetAllPostQuery__
 *
 * To run a query within a React component, call `useGetAllPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, baseOptions);
      }
export function useGetAllPostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, baseOptions);
        }
export type GetAllPostQueryHookResult = ReturnType<typeof useGetAllPostQuery>;
export type GetAllPostLazyQueryHookResult = ReturnType<typeof useGetAllPostLazyQuery>;
export type GetAllPostQueryResult = ApolloReactCommon.QueryResult<GetAllPostQuery, GetAllPostQueryVariables>;
export const GetAllPostByIdDocument = gql`
    query GetAllPostById($userId: Float!) {
  getAllPostById(userId: $userId) {
    postId
    title
    creationDate
    tags
    user {
      name
      email
      id
    }
  }
}
    `;

/**
 * __useGetAllPostByIdQuery__
 *
 * To run a query within a React component, call `useGetAllPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllPostByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPostByIdQuery, GetAllPostByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllPostByIdQuery, GetAllPostByIdQueryVariables>(GetAllPostByIdDocument, baseOptions);
      }
export function useGetAllPostByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPostByIdQuery, GetAllPostByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllPostByIdQuery, GetAllPostByIdQueryVariables>(GetAllPostByIdDocument, baseOptions);
        }
export type GetAllPostByIdQueryHookResult = ReturnType<typeof useGetAllPostByIdQuery>;
export type GetAllPostByIdLazyQueryHookResult = ReturnType<typeof useGetAllPostByIdLazyQuery>;
export type GetAllPostByIdQueryResult = ApolloReactCommon.QueryResult<GetAllPostByIdQuery, GetAllPostByIdQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: Float!) {
  getUser(userId: $userId) {
    id
    name
    email
    joinedDate
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInputType!) {
  login(data: $data) {
    accessToken
    user {
      id
      email
      name
      joinedDate
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    joinedDate
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    mutation Post($data: PostInput!) {
  post(data: $data) {
    postId
    title
  }
}
    `;
export type PostMutationFn = ApolloReactCommon.MutationFunction<PostMutation, PostMutationVariables>;

/**
 * __usePostMutation__
 *
 * To run a mutation, you first call `usePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutation, { data, loading, error }] = usePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostMutation, PostMutationVariables>) {
        return ApolloReactHooks.useMutation<PostMutation, PostMutationVariables>(PostDocument, baseOptions);
      }
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = ApolloReactCommon.MutationResult<PostMutation>;
export type PostMutationOptions = ApolloReactCommon.BaseMutationOptions<PostMutation, PostMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInputType!) {
  register(data: $data) {
    id
    name
    email
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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