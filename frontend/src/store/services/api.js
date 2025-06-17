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

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const dispatchResult = dispatch(
          api.util.updateQueryData("getProducts", undefined, (products) => {
            const productIndex = products.findIndex((p) => data.id == p.id);
            console.log(productIndex);
            products[productIndex] = { ...products[productIndex], ...data };
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          dispatchResult.undo();
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const dispatchResult = dispatch(
          api.util.updateQueryData("getProducts", undefined, (products) => {
            const productIndex = products.findIndex((p) => id == p.id);
            products.splice(productIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          dispatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
