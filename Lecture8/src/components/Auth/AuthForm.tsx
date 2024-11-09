import React from 'react';
import { Box, Button, TextField, Typography, Avatar, Container, CssBaseline, Link, Alert, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { green } from '@mui/material/colors';

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  redirectLink: { text: string; href: string };
  formData: { username: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit, loading, error, redirectLink, formData, handleChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: green[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={!!error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                type="password"
                required
                fullWidth
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={!!error}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Loading...' : buttonText}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={redirectLink.href} variant="body1">
                {redirectLink.text}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
