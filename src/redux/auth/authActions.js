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
    signIn:builder.mutation({
      query:(body) => ({
        url: apiRoutes.ROOT + apiRoutes.AUTHENTICATION.signIn.url,
        method: apiRoutes.AUTHENTICATION.signIn.method,
        body,
      })
    })
  }),
});

export const {useSignUpMutation,useSignInMutation} = authApi;
