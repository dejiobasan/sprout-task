import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/constants";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});
