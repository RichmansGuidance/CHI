import React from 'react';
import AuthForm from './AuthForm';
import { UserActions } from '../../api/userActions';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegisterForm: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(4, 'Minimum 4 symbols').required('Required field'),
      password: Yup.string().min(4, 'Мінімум 4 символи').required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        await UserActions.register(values);
        navigate('/login');
      } catch (error) {
        formik.setErrors({ username: 'Registration failed' });
      }
    },
  });

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      onSubmit={formik.handleSubmit}
      loading={formik.isSubmitting}
      error={formik.errors.username || null}
      redirectLink={{ text: 'Already have an account? Sign in', href: '/login' }}
      formData={formik.values}
      handleChange={formik.handleChange}
    />
  );
});

export default RegisterForm;
