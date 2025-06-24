import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["products", "carts"],
  endpoints: (builder) => ({
    // Product api
    getProducts: builder.query({
      query: (params) => {
        return `/products?_start=${params.start || 0}&_limit=${
          params.limit || 6
        }`;
      },
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

    // Carts api start from here
    getAllCarts: builder.query({
      query: () => "/carts",
      providesTags: ["carts"],
      transformResponse: (carts) => carts.reverse(),
    }),

    // Get all carts by user
    getCartsByUser: builder.query({
      query: (userId) => `/carts?userId=${userId}`,
      providesTags: ["carts"],
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["carts"],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      // optimistic update
      async onQueryStarted(
        { id, quantity },
        { dispatch, queryFulfilled, getState }
      ) {
        const patchResult = dispatch(
          api.util.updateQueryData(
            "getCartsByUser",
            getState().user.data.id,
            (draft) => {
              const item = draft.find((d) => d.id === id);
              if (item) {
                item.quantity = quantity;
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["carts"],
    }),

    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllCartsQuery,
  useAddToCartMutation,
  useGetCartsByUserQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = api;
