import { Box, Button, CircularProgress, TextField, Snackbar } from "@mui/material";
import { useRequest } from "ahooks";
import React, { useState, useCallback } from "react";
import { CommentsActions } from "../../api/commentsActions";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useRouter } from "next/navigation";
import { AddCommentFormPropsI } from "@/Interfaces/AddCommentFormPropsI";

const AddCommentForm: React.FC<AddCommentFormPropsI> = ({ exhibitID, onSuccess, isAuthenticated }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const { run: addComment, loading: addingComment } = useRequest(
    async () => await CommentsActions.createComment(exhibitID, newComment),
    {
      manual: true,
      onSuccess: () => {
        onSuccess();
        setNewComment("");
      },
      onError: (err) => {
        console.log("Failed to add comment", err);
        setErrorMessage("Failed to add comment.");
      }
    }
  );

  const handleSubmit = useCallback(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (newComment.trim()) addComment();
  }, [newComment, isAuthenticated, addComment, router]);

  const handleCloseSnackbar = () => setErrorMessage(null);

  return (
    <>
      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mr: 1 }}
          autoFocus={true}
        />
        <Button 
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={addingComment || !newComment.trim()}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {addingComment ? <CircularProgress size={24} /> : <SendRoundedIcon />}
        </Button>
      </Box>
      
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          message={errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        />
      )}
    </>
  );
};

export default AddCommentForm;
