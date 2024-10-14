import {api} from '../apiInterceptor';
import {apiRoutes} from '../apiRoutes';

const expenseApi = api.injectEndpoints({
  endpoints: builder => ({
    addExpense: builder.mutation({
      query: body => ({
        url: apiRoutes.ROOT + apiRoutes.EXPENSE.addExpense.url,
        method: apiRoutes.EXPENSE.addExpense.method,
        headers: {
          'Content-type': 'multipart/form-data',
        },
        body,
      }),
      transformResponse: res => res,
    }),
    getAllExpenses: builder.query({
      query: () => ({
        url: apiRoutes.ROOT + apiRoutes.EXPENSE.getAllExpenses.url,
        method: apiRoutes.EXPENSE.getAllExpenses.method,
      }),
      transformResponse: res => res,
    }),
  }),
});

export const {useAddExpenseMutation, useGetAllExpensesQuery} = expenseApi;
