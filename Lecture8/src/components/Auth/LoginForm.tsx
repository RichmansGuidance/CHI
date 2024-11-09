import React, { useState, useCallback } from 'react';
import AuthForm from './AuthForm';
import { UserActions } from '../../api/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/slices/userSlice';
import { useRequest } from 'ahooks';
import { LoginI } from '../../Interfaces/LoginI';


const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginI>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const { run: handleLogin, loading } = useRequest(
    async () => UserActions.login(formData),
    {
      manual: true,
      onSuccess: () => {
        dispatch(login(formData)); 
        navigate('/'); 
      },
      onError: () => setError('Invalid username or password'),
    }
  );

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      redirectLink={{ text: "Don't have an account? Register now", href: '/register' }}
      formData={formData}
      handleChange={handleChange}
    />
  );
};

export default LoginForm;
