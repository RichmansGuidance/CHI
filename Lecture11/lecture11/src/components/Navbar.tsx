'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAuthentication = useCallback(() => {
    if (isAuthenticated) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <AppBar position="sticky" sx={{
      bgcolor: theme.palette.primary.main, 
      color: theme.palette.common.white, 
      boxShadow: 'none', 
      zIndex: 1200,
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            letterSpacing: '1px', 
            fontSize: '1.25rem',
          }}
        >
          <Link href="/exhibits" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            Museum.io
          </Link>
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          {isAuthenticated && (
            <>
              <Button
                onClick={handleMenuClose}
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 600,
                  mx: 2, 
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Link href="/my-posts" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  My Posts
                </Link>
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                    color: 'white',
                    borderColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Link href="/create-post" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  Create Post
                </Link>
              </Button>
            </>
          )}

          <Button
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500,
              ml: 3,
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
            onClick={handleAuthentication}
          >
            {isAuthenticated ? (
              <>
                Logout <LogoutIcon sx={{ ml: 0.3 }} />
              </>
            ) : (
              <Link href="/login" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            )}
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            onClick={handleMenuOpen}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {isAuthenticated && (
            <>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/my-posts" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  My Posts
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/create-post" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                  Create Post
                </Link>
              </MenuItem>
            </>
          )}
          <MenuItem onClick={handleAuthentication}>
            {isAuthenticated ? 'Logout' : (
              <Link href="/login" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                Login
              </Link>
            )}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
