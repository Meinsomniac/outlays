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
    signIn: builder.mutation({
      query: body => ({
        url: apiRoutes.ROOT + apiRoutes.AUTHENTICATION.signIn.url,
        method: apiRoutes.AUTHENTICATION.signIn.method,
        body,
      }),
      transformResponse: res => res,
    }),
    signInWithGoogle: builder.mutation({
      query: body => ({
        url: apiRoutes.ROOT + apiRoutes.AUTHENTICATION.signInWithGoogle.url,
        method: apiRoutes.AUTHENTICATION.signInWithGoogle.method,
        body,
      }),
      transformResponse: res => res,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignInWithGoogleMutation,
} = authApi;
