import * as Yup from 'yup';

export const validations = {
  firstName: () =>
    Yup.string()
      .required('First Name is required')
      .min(2, 'Invalid first name'),
  lastName: () =>
    Yup.string().required('LastName is required').min(2, 'Invalid last name'),
  email: () =>
    Yup.string()
      .required('Email is required')
      .matches(
        '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}',
        'Invalid email address',
      ),
  password: () => Yup.string().required('Password is required'),
};
