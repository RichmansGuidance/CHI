 "use client";
import React, { useState, useCallback } from 'react';
import AuthForm from './AuthForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/slices/userSlice';
import { useRequest } from 'ahooks';
import { LoginI } from '../../Interfaces/LoginI';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [, setFormData] = useState<LoginI>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { run: handleLogin, loading } = useRequest(
    async (formData: LoginI) => {
      setFormData(formData);
      dispatch(login(formData));
    },
    {
      manual: true,
      onSuccess: () => {
        router.push('/exhibits');
      },
      onError: (err) => {
        console.error("Login Error: ", err);
        setError('Invalid username or password. Please try again.');
      },
    }
  );

  const memoizedHandleLogin = useCallback(
    (formData: LoginI) => handleLogin(formData),
    [handleLogin]
  );

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={memoizedHandleLogin}
      loading={loading}
      error={error}
      redirectLink={{ text: "Don't have an account? Sign up", href: '/register' }}
    />
  );
};

export default LoginForm;
