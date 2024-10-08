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
  }),
});

export const {useAddExpenseMutation} = expenseApi;
