"use client";
import React, { useState, useCallback } from 'react';
import AuthForm from './AuthForm';
import { UsersActions } from '../../api/usersActions';
import { useRequest } from 'ahooks';
import { LoginI } from '../../Interfaces/LoginI';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { run: handleRegister, loading } = useRequest(
    async (formData: LoginI) => {
      return await UsersActions.register(formData);
    },
    {
      manual: true,
      onSuccess: () => router.push('/login'),
      onError: (err) => {
        setError('Registration failed. Please try again.');
        console.error("Registration Error: ", err); 
      },
    }
  );

  // на випадок масс-реєстрації
  const memoizedHandleRegister = useCallback(
    (formData: LoginI) => handleRegister(formData),
    [handleRegister]
  );

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      onSubmit={memoizedHandleRegister}
      loading={loading}
      error={error}
      redirectLink={{ text: 'Already have an account? Sign in', href: '/login' }}
    />
  );
};

export default RegisterForm;
