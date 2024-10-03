export const apiRoutes = {
  ROOT: 'http://10.0.1.38:3000/api',
  AUTHENTICATION: {
    signUp: {
      url: '/sign-up',
      method: 'POST',
    },
    signIn: {
      url: '/sign-in',
      method: 'POST',
    },
    signInWithGoogle: {
      url: '/google-signin',
      method: 'POST',
    },
  },
};
