import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardMetrics, NewProduct, Product, User } from "@/types";

//making an api call from frontend to backend
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",

  /*tags in which the response gets saved, we can invalidate anytime we make a post request(refetch when property gets updated)*/

  tagTypes: ["DashboardMetrics", "Products", "Users"],
  endpoints: (build) => ({
    //void cause it's a get request
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard", //appends to base query
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),

      //updates the product list when a new product gets added.
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], string | void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
} = api;
