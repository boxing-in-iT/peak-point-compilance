import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/Prod/api/v1/chat/",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, { user_query: string }>({
      query: (message) => ({
        url: "message",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
