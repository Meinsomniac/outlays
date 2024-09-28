import {api} from '../apiInterceptor';
import {apiRoutes} from '../apiRoutes';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: body => ({
        url: apiRoutes.ROOT + apiRoutes.AUTHENTICATION.signUp.url,
        method: apiRoutes.AUTHENTICATION.signUp.method,
        body,
      }),
      transformResponse: res => res,
    }),
  }),
});

export const {useSignUpMutation} = authApi;
