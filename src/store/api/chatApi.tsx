import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "https://lzcbdxce68.execute-api.eu-central-1.amazonaws.com/Prod/api/v1/chat/",
      "https://18.227.114.8/",
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
