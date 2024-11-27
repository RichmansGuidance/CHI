import { Typography } from "@mui/material";
import React from "react";
import Comment from "./Comment";
import { CommentListPropsI } from '../../Interfaces/CommentListPropsI';

const CommentList: React.FC<CommentListPropsI> = ({ comments, onCommentDelete }) => {
  if (!comments || comments.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No comments yet.
      </Typography>
    );
  }

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onCommentDelete={onCommentDelete} />
      ))}
    </>
  );
};

export default React.memo(CommentList);
