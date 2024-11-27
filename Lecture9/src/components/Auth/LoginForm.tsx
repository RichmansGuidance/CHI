import React from 'react';
import AuthForm from './AuthForm';
import { UserActions } from '../../api/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/slices/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(4, 'Minimum 4 symbols').required('Required Field'),
      password: Yup.string().min(4, 'Minimum 4 symbols').required('Required Field'),
    }),
    onSubmit: async (values) => {
      try {
        await UserActions.login(values);
        dispatch(login(values));
        navigate('/');
      } catch (error) {
        formik.setErrors({ password: 'Wrong username or password' });
      }
    },
  });

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={formik.handleSubmit}
      loading={formik.isSubmitting}
      error={formik.errors.password || null}
      redirectLink={{ text: "Don't have an account? Register now", href: '/register' }}
      formData={formik.values}
      handleChange={formik.handleChange}
    />
  );
});

export default LoginForm;
