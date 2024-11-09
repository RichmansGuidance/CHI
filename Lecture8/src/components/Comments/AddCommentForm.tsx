import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRequest } from "ahooks";
import React, { useCallback, useState } from "react";
import { CommentsActions } from "../../api/commentsActions";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

interface AddCommentFormProps {
    exhibitID: number;
    onSuccess: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ exhibitID, onSuccess }) => {
    const [newComment, setNewComment] = useState<string>("");

    const { run: addComment, loading: addingComment } = useRequest(
        () => CommentsActions.createComment(exhibitID, newComment),
        {
            manual: true,
            onSuccess: () => {
                onSuccess();
                setNewComment("");
            },
            onError: (err) => {
                console.error("Failed to add comment", err);
            }
        }
    );

    const handleSubmit = useCallback(() => {
        if (newComment.trim()) addComment();
    }, [newComment, addComment]);

    return (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <TextField
                fullWidth
                label="Add a comment"
                variant="outlined"
                size="small"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mr: 1 }}
                autoFocus
            />
            <Button 
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={addingComment || !newComment.trim()}
            >
              {addingComment ? <CircularProgress size={24} /> : <SendRoundedIcon />}
            </Button>
        </Box>
    );
};

export default React.memo(AddCommentForm);
