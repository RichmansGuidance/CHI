import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import HomePage from './layouts/HomePage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import MyPostsPage from './layouts/MyPostsPage';
import CreatePostPage from './layouts/CreatePostPage';

const App: React.FC = () => {
  const userAuthStatus = useSelector((state: RootState) => state.user.status);

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={
              <LoginPage />
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-posts" element={
            <ProtectedRoute isAllowed={userAuthStatus}>
              <MyPostsPage />
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute isAllowed={userAuthStatus}>
              <CreatePostPage />
            </ProtectedRoute>
          } />
        </Routes>
    </Router>
  );
};

export default App;