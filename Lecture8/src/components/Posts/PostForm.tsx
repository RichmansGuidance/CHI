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
import '../../styles/PostForm.css'; 

const PostForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { run: submitForm, loading, error } = useRequest(
    () => {
      const formData = new FormData();
      formData.append("description", description);
      if (image) formData.append("image", image);
      return ExhibitActions.createExhibit(formData);
    },
    {
      manual: true,
      onSuccess: () => {
        setDescription("");
        setImage(null);
        setImagePreview(null);
      },
      onError: (err: any) => {
        console.error("Failed to create a new post", err);
      },
    }
  );

  const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }, []);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (description.trim() && image) {
      submitForm();
    }
  }, [description, image, submitForm]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Card className="card">
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
            value={description}
            onChange={handleDescriptionChange}
            className="text-field"
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className="upload-button"
          >
            Upload files
            <input type="file" onChange={handleImageChange} multiple style={{ display: 'none' }} />
          </Button>
          {imagePreview && (
            <Box className="image-preview">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "10px", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
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
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!description.trim() || !image || loading}
            className="submit-button"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostForm;