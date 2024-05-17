import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[a-zA-Z0-9._%+-]+@tuni\.fi$/, 'Email must end with @tuni.fi')
    .required('Email is required'),
  password: Yup.string().required('Password is required')
});

// export const loginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email')
//     .matches(/^[a-zA-Z0-9._%+-]+@tuni\.fi$/, 'Email must end with @tuni.fi')
//     .required('Email is required'),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
//       'Password must have at least 8 characters, including lowercase letters, uppercase letters, and a number'
//     )
//     .required('Password is required')
// });
