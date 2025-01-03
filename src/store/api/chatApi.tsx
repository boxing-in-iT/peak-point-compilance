import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://18.227.114.8/",
    prepareHeaders: (headers) => {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnQUFBQUFCbmVFd2NPQkxwS0VpSGpZb3BNV1p3dW1EZ0ZEazBHQVEzb1lLTGIzdVJCT0M3MmFmeFZvLXhGN1JwellvS280b2ZkbEQ5S3VVTDd0UEF3bkRSQU9ENi1kR0VSZz09IiwiZXhwIjoxOTk1MTM3MDUyLjcwOTEyNX0.7TpwL8K9A8z_m3-oBd7XK1yyG3YDNwMVwGW3x6qn3Js";

      // Добавляем токен в заголовки
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, { user_query: string }>({
      query: (message) => ({
        url: "api/v1/chat/message",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
