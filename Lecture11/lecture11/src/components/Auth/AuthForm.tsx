import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  CssBaseline,
  Link,
  Alert,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { AuthFormPropsI } from "@/Interfaces/AuthFormPropsI";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(1, "Username must be at least 1 character long"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const AuthForm: React.FC<AuthFormPropsI> = ({ title, buttonText, onSubmit, loading, error, redirectLink }) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
          {title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mt: 3 }}>
                <Grid2 container spacing={2}>
                  <Grid2>
                    <Field
                      as={TextField}
                      name="username"
                      fullWidth
                      label="Username"
                      required
                      error={touched.username && Boolean(errors.username)}
                      helperText={<ErrorMessage name="username" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2>
                    <Field
                      as={TextField}
                      name="password"
                      type="password"
                      fullWidth
                      label="Password"
                      required
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "10px",
                  }}
                >
                  {loading ? "Loading..." : buttonText}
                </Button>

                <Grid2 container justifyContent="flex-end">
                  <Grid2>
                    <Link
                      href={redirectLink.href}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        "&:hover": {
                          textDecoration: "underline",
                          color: "primary.main",
                        },
                      }}
                    >
                      {redirectLink.text}
                    </Link>
                  </Grid2>
                </Grid2>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AuthForm;
