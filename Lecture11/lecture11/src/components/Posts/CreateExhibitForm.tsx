"use client";
import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useRequest } from "ahooks";
import { ExhibitsActions } from "../../api/exhibitsActions";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { ExhibitDTOI } from "../../Interfaces/ExhibitDTOI";
import { Toaster } from "react-hot-toast";
import useToast from "../../hooks/useToast";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateExhibitSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is required")
    .max(100, "Description cannot be greater than 100 characters"),
  image: Yup.mixed().required("Image is required"),
});

const CreateExhibitForm: React.FC = () => {
  const theme = useTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { successNotification } = useToast();

  const { run: submitForm, loading, error } = useRequest(
    async (formValues: ExhibitDTOI) => {
      const formData = new FormData();
      formData.append("description", formValues.description);
      if (formValues.image) formData.append("image", formValues.image);

      return await ExhibitsActions.createExhibit(formData);
    },
    {
      manual: true,
      onSuccess: () => {
        setImagePreview(null);
        successNotification("Post has been posted");
      },
      onError: (err: any) => {
        console.error("Failed to post a new post", err);
      },
    }
  );

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setFieldValue("image", file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    []
  );

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ description: "", image: null }}
        validationSchema={CreateExhibitSchema}
        onSubmit={(formData, { resetForm }) => {
          submitForm(formData);
          resetForm();
        }}
      >
        {({ values, errors, touched, setFieldValue, handleBlur, handleChange }) => (
          <Form>
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Create New Post
                  </Typography>

                  {error && (
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ textAlign: "center", marginBottom: 2 }}
                    >
                      Failed to create a post
                    </Typography>
                  )}

                  <TextField
                    label="Post Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{
                      marginBottom: 2,
                      "& .MuiInputBase-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />

                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => handleImageUpload(event, setFieldValue)}
                    />
                  </Button>
                  {touched.image && errors.image && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                      {errors.image}
                    </Typography>
                  )}

                  {imagePreview && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxWidth: "400px",
                          borderRadius: "10px",
                          boxShadow: theme.shadows[2],
                        }}
                      />
                    </Box>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading || !values.description || !values.image}
                    sx={{
                      padding: "10px 20px",
                      fontWeight: "bold",
                      borderRadius: "12px",
                      boxShadow: 3,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateExhibitForm;
