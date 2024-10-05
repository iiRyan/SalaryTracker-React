import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:9080/expenses-tracker';

export const apiSlice = createApi({

    baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
    endpoints : builder => ({
        // get categories
        getMonths : builder.query({
            // get: 'http://localhost:8080/api/categories'
            query: (month) => `/api/months/${month}`,
            providesTags:['months']
        }),


        getMonth : builder.query({
            // get: 'http://localhost:8080/api/categories'
            query: () => `/api/months`,
            providesTags:['months']
        }),


        // // get labels
        // getLabels : builder.query({
        //     // get: 'http://localhost:8080/api/labels'
        //     query : () => '/api/labels',
        //     providesTags: ['transaction']
        // }),

        addTransaction: builder.mutation({
            query: ({ initialTransaction, month }) => ({
                url: `/api/expenses/${month}`,
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags: ['months']  // Invalidate the 'months' tag so the history (getMonths) refetches
        }),
        
        

        deleteTransaction: builder.mutation({
            query: ({ month, recordId }) => ({
                url: `/api/expenses/${month}/${recordId}`,
                method: "DELETE",
                body: { id: recordId },  // Include the recordId in the body
            }),
            invalidatesTags: ['months']  // Invalidate cache so the transactions will be refetched
        }),

        deleteMonth: builder.mutation({
            query: ({recordId }) => ({
                url: `/api/months/${recordId}`,
                method: "DELETE",
                body: { id: recordId },  // Include the recordId in the body
            }),
            invalidatesTags: ['months']  // Invalidate cache so the transactions will be refetched
        })
        

    })

    
})

export default apiSlice;