import styled from '@emotion/styled';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import React, { useCallback } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useRequest } from 'ahooks';
import { CommentsActions } from '../../api/commentsActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AvatarHeader from '../helpers/AvatarHeader';
import { CommentPropsI } from '@/Interfaces/CommentPropsI';

const StyledComment = styled(Box)({
  padding: "12px 20px",
  borderRadius: "12px", 
  backgroundColor: "#FAFAFA", 
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
  marginBottom: "15px", 
  transition: "transform 0.3s ease, box-shadow 0.3s ease", 
  "&:hover": {
    backgroundColor: "#E0E0E0", 
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)", 
    transform: "translateY(-3px)", 
  },
  "&:active": {
    transform: "translateY(1px)", 
  },
});

const Comment: React.FC<CommentPropsI> = ({ comment, onCommentDelete }) => {
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const { run: removeComment, loading } = useRequest(
    async () => CommentsActions.deleteComment(comment.id),
    {
      manual: true,
      onSuccess: () => {
        onCommentDelete();
      }
    }
  );

  // Мемоізація функції видалення
  const handleDeleteComment = useCallback(() => {
    removeComment();
  }, [removeComment]);

  return (
    <StyledComment key={comment.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <AvatarHeader
          username={comment.user.username}
          createdAt={comment.createdAt}
          avatarSize={30}
          usernameFontSize="1rem"
          usernameFontWeight="bold"
          usernameVariant="body1"
          dateFontSize="0.75rem"
          dateVariant="caption"
          dateFontStyle="italic"
          padding={0}
          marginRight={1.5}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, ml: 0.5 }}>
          {comment.text}
        </Typography>
      </Box>
      {userId === comment.user.id && (
        <IconButton
          onClick={handleDeleteComment}
          aria-label="delete comment"
          color="error"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : <ClearIcon />}
        </IconButton>
      )}
    </StyledComment>
  );
};

export default Comment;
