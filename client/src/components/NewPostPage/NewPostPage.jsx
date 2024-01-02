import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const NewPostPage = () => {
  const [imageFile, setImageFile] = useState(null); 
  const [description, setDescription] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeImage = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setImageFile(null);
    setDescription("");
    setIsSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Create New Post
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmitPost}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <input
                accept="image/*"
                type="file"
                id="image-file"
                hidden
                onChange={handleChangeImage}
              />
              <Label htmlFor="image-file">
                <Button variant="outlined" component="label">
                  <AddPhotoAlternateIcon fontSize="large" /> &nbsp; Choose Image
                </Button>
              </Label>
              {imageFile && (
                <Typography variant="subtitle2" sx={{ marginLeft: 2 }}>
                  {imageFile.name}
                </Typography>
              )}
            </Box>
            <TextField
              required
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth type="submit" disabled={!imageFile || !description}>
              Post
            </Button>
          </form>
          {isSubmitting && (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const Label = ({ htmlFor, children }) => (
  <Box htmlFor={htmlFor} sx={{ cursor: "pointer" }}>
    {children}
  </Box>
);

export default NewPostPage;
