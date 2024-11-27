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
import { ExhibitActions } from "../../api/exhibitsActions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../../styles/PostForm.css';
import Notification from "../Notification";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(4, "Description must be at least 4 characters")
    .required("Description is required"),
  image: Yup.mixed<File>()
    .required("Image is required")
    .test("fileType", "Only PNG or JPG files are allowed", (value) =>
      value ? ["image/png", "image/jpeg"].includes(value.type) : false
    ),
});

const PostForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newPost, setNewPost] = useState(false);

  const { run: submitForm, loading, error } = useRequest(
    (formData: FormData) => ExhibitActions.createExhibit(formData),
    {
      manual: true,
      onSuccess: () => {
        formik.resetForm();
        setImagePreview(null);
        setNewPost(true);
      },
      onError: (err: any) => {
        console.error("Failed to create a new post", err);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      description: "",
      image: null as File | null,
    },
    validationSchema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("description", formik.values.description);
      if (formik.values.image) formData.append("image", formik.values.image);
      submitForm(formData);
    },
  });

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, [formik]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      {newPost && <Notification onNewPost={() => setNewPost(false)} />}

      <Card className="card">
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Typography variant="h5" gutterBottom className="card-title">
              Create New Post
            </Typography>
            <TextField
              label="Post Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              className="text-field"
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              className="upload-button"
            >
              Upload file
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Button>
            {formik.errors.image && formik.touched.image && (
              <Typography className="error-message" variant="body2">
                {formik.errors.image}
              </Typography>
            )}
            {imagePreview && (
              <Box className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              </Box>
            )}
            {error && (
              <Typography className="error-message" variant="body2">
                Failed to create a post
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              className="submit-button"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default PostForm;
