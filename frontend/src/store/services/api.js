import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    // Product api
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["products"],
      transformResponse: (products) => products.reverse(),
    }),

    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = api;
