export const apiRoutes = {
  ROOT: 'http://192.168.10.52:3000/api',
  AUTH: 'http://192.168.10.52:3000/auth',
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
  EXPENSE: {
    addExpense: {
      url: '/add-expense',
      method: 'POST',
    },
    getAllExpenses: {
      url: '/expense',
      method: 'GET',
    },
  },
};
