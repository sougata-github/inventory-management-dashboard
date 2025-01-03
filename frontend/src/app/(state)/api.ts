import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardMetrics } from "@/types";

//making an api call from frontend to backend
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",

  /*tags in which the response gets saved, we can invalidate anytime we make a post request(refetch when property gets updated)*/
  tagTypes: ["DashboardMetrics"],
  endpoints: (build) => ({
    //void cause it's a get request
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard", //appends to base query
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = api;
