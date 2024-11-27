import React, { useCallback, useMemo, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import '../styles/Navbar.css'; 

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  const [, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    handleMenuClose();
  }, [navigate, handleMenuClose]);

  const handleAuthentication = useCallback(() => {
    if (isAuthenticated) {
      dispatch(logout());
      handleNavigation('/');
    } else {
      handleNavigation('/login');
    }
  }, [isAuthenticated, dispatch, handleNavigation]);

  const desktopMenu = useMemo(() => (
    <Box className="desktop-menu">
      <Button color="inherit" onClick={handleAuthentication}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </Box>
  ), [isAuthenticated, handleAuthentication]);

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          className="navbar-title"
          onClick={() => handleNavigation('/')}
        >
          Museum.io
        </Typography>

        {isAuthenticated && (
          <Box className="desktop-menu">
            <Button
              onClick={() => handleNavigation('/my-posts')}
              sx={{ fontWeight: 'medium' }}
            >
              My Posts
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handleNavigation('/create-post')}
              className="create-post-button"
            >
              Create Post
            </Button>
          </Box>
        )}

        {desktopMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
