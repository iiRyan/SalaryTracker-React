import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8080/api/v1';

export const apiSlice = createApi({

    baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
    endpoints : builder => ({
        // get list of expenses
        getExpenses: builder.query({
            query: (month) => ({
                url: `/expenses/${month}`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                }
            }),
            providesTags: ['Expenses'],
        }),


        getSalaries: builder.query({
            query: () => ({
                url: `/salaries`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                }
            }),
            providesTags: ['salaries'],
        }),

        addMonth: builder.mutation({
            query: ({ initialTransaction }) => ({
                url: `/salaries`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                },
                method: "POST",
                body: initialTransaction
            }),
            // invalidatesTags: ['months']  // Invalidate the 'months' tag so the history (getMonths) refetches
        }),

        // // get labels
        // getLabels : builder.query({
        //     // get: 'http://localhost:8080/api/labels'
        //     query : () => '/api/labels',
        //     providesTags: ['transaction']
        // }),

        addTransaction: builder.mutation({
            query: ({ initialTransaction }) => ({
                url: `/expenses`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                },
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags: ['months']  // Invalidate the 'months' tag so the history (getMonths) refetches
        }),
        
        

        deleteTransaction: builder.mutation({
            query: ({ recordId }) => ({
                url: `/expenses/${recordId}`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                },
                method: "DELETE",
                body: { id: recordId },  // Include the recordId in the body
            }),
            invalidatesTags: ['Expenses']  // Invalidate cache so the transactions will be refetched
        }),

        deleteSalary: builder.mutation({
            query: ({recordId }) => ({
                url: `/salaries/${recordId}`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                },
                method: "DELETE",
                body: { id: recordId },  // Include the recordId in the body
            }),
            invalidatesTags: ['salaries']  // Invalidate cache so the transactions will be refetched
        }),
        
        // Get logged in user
         getUser: builder.query({
            query: () => ({
                url: `/users`,
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token here
                }
            }),
            
        }),

    })

    
})

export default apiSlice;