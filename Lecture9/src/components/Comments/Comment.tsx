import React, { useCallback } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useRequest } from 'ahooks';
import { CommentsActions } from '../../api/commentsActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import '../../styles/Comment.css'; 
import { CommentPropsI } from '../../Interfaces/CommentPropsI';

const Comment: React.FC<CommentPropsI> = ({ comment, onCommentDelete }) => {
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const { run: removeComment, loading } = useRequest(
    () => CommentsActions.deleteComment(comment.id),
    {
      manual: true,
      onSuccess: onCommentDelete,
      onError: (err) => console.error("Failed to delete comment", err),
    }
  );

  const handleDeleteComment = useCallback(() => {
    removeComment();
  }, [removeComment]);

  return (
    <Box className="commentBox" key={comment.id}>
      <Typography variant="body1" className="commentText">
        {comment.user.username}
        <Typography variant="body2" className="commentContent">
          {comment.text}
        </Typography>
      </Typography>
      {userId === comment.user.id && (
        <IconButton
          onClick={handleDeleteComment}
          aria-label="delete comment"
          color="error"
          disabled={loading}
        >
          <ClearIcon/>
        </IconButton>
      )}
    </Box>
  );
};

export default React.memo(Comment);
