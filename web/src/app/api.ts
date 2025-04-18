import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  SignupInfo,
  LoginInfo,
  UserInfo,
  UserData,
  TutorInfoWithoutId,
  StudentInfoWithoutId,
  TutorResult,
  TutorSearch,
  TutorInfo,
  CreateMatchInfo,
  TutorComment,
  CreateComment,
  StudentInfo,
} from '../types/types';
import { API_ROUTES, SERVER_URL } from '../constants/constants';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = (getState() as RootState).user as UserData;
    const token = user?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Tutor', 'Student', 'Comment'],
  endpoints: (builder) => ({

    // Account endpoints
    signup: builder.mutation<UserData, SignupInfo>({
      query: (creds) => ({
        url: API_ROUTES.ACCOUNT.signup,
        method: 'POST',
        body: creds,
      }),
    }),
    login: builder.mutation<UserData, LoginInfo>({
      query: (creds) => ({
        url: API_ROUTES.ACCOUNT.login,
        method: 'POST',
        body: creds,
      }),
      invalidatesTags: ['User'],
    }),
    setUserInfo: builder.mutation<UserInfo, UserInfo>({
      query: ( info ) => ({
        url: API_ROUTES.RECORD.update(),
        method: 'PUT',
        body: info,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: () => ({
        url: API_ROUTES.RECORD.delete(),
        method: 'DELETE',
      }),
    }),

    // Tutor endpoints
    createTutor: builder.mutation<TutorInfo, TutorInfoWithoutId>({
      query: (creds) => ({
        url: API_ROUTES.TUTOR.create(),
        method: 'POST',
        body: creds,
      }),
      invalidatesTags: ['User', 'Tutor'],
    }),
    updateTutor: builder.mutation<TutorInfo, TutorInfoWithoutId>({
      query: (creds) => ({
        url: API_ROUTES.TUTOR.update(),
        method: 'PUT',
        body: creds,
      }),
      invalidatesTags: ['User', 'Tutor'],
    }),
    getTutor: builder.query<TutorInfo, string>({
      query: (username) => API_ROUTES.TUTOR.get(username),
      providesTags: ['Tutor'],
    }),
    uploadTutorPortrait: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('portrait', file);
        return {
          url: API_ROUTES.TUTOR.upload(),
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['Tutor'],
    }),
    searchTutors: builder.query<TutorResult[], TutorSearch>({
      query: (query) => ({
        url: API_ROUTES.TUTOR.search,
        params: query,
      }),
      providesTags: ['Tutor'],
    }),

    // Student endpoints
    createStudent: builder.mutation<StudentInfo, StudentInfoWithoutId>({
      query: (info) => ({
        url: API_ROUTES.STUDENT.create(),
        method: 'POST',
        body: info,
      }),
      invalidatesTags: ['User', 'Student'],
    }),
    updateStudent: builder.mutation<StudentInfo, StudentInfoWithoutId>({
      query: (info) => ({
        url: API_ROUTES.STUDENT.update(),
        method: 'PUT',
        body: info,
      }),
      invalidatesTags: ['User', 'Student'],
    }),
    getStudent: builder.query<StudentInfo, string>({
      query: (username) => API_ROUTES.STUDENT.get(username),
      providesTags: ['Student'],
    }),

    // Match endpoints
    createMatch: builder.mutation<StudentInfo, CreateMatchInfo>({
      query: (creds) => ({
        url: API_ROUTES.MATCH.create(),
        method: 'POST',
        body: creds,
      }),
      invalidatesTags: ['User', 'Student'],
    }),

    // Comment endpoints
    createComment: builder.mutation<CreateComment, CreateComment>({
      query: (comment) => ({
        url: API_ROUTES.COMMENT.create(),
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comment'],
    }),
    getComments: builder.query<TutorComment[], number>({
      query: (tutorId) => API_ROUTES.COMMENT.get(tutorId),
      providesTags: ['Comment'],
    }),
    deleteComment: builder.mutation<void, number>({
      query: (commentId) => ({
        url: API_ROUTES.COMMENT.delete(commentId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSetUserInfoMutation,
  useDeleteUserMutation,
  useCreateTutorMutation,
  useUpdateTutorMutation,
  useGetTutorQuery,
  useUploadTutorPortraitMutation,
  useSearchTutorsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetStudentQuery,
  useCreateMatchMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = apiSlice;