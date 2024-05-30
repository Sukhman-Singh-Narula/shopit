import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Order", "AdminOrders"],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query(body) {
                return {
                    url: "/orders/new",
                    method: "POST",
                    body,
                }

            },
        }),
        stripeCheckoutSession: builder.mutation({
            query(body) {
                return {
                    url: "/payment/checkout_session",
                    method: "POST",
                    body,
                }

            },
        }),
        MyOrders: builder.query({
            query: () => "/me/orders",
        }),
        orderDetails: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ["Order"],
        }),
        submitReview: builder.mutation({
            query(body) {
                return {
                    url: "/reviews",
                    method: "PUT",
                    body,
                }

            },
        }),
        getDashboardSales: builder.query({
            query: ({ startDate, endDate }) =>
              `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
        }),
        getAdminOrders: builder.query({
            query: () => "/admin/orders",
            providesTags: ["AdminOrders"],
        }),
        
        UpdateOrder: builder.mutation({
            query({id, body}) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "POST",
                    body,
                }},
                invalidatesTags: ["Order"]
        }),
        DeleteOrder: builder.mutation({
            query({id}) {
                return {
                    url: `/admin/orders/${id}`,
                    method: "DELETE",
                }},
                invalidatesTags: ["AdminOrders"]
        }),
        
        

    }),
});

export const { useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useMyOrdersQuery, useOrderDetailsQuery, useSubmitReviewMutation, useLazyGetDashboardSalesQuery, useGetAdminOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } =
    orderApi;
