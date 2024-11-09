import { Typography } from "@mui/material";
import React from "react";
import { CommentI } from "../../Interfaces/CommentI";
import Comment from "./Comment";

interface CommentListProps {
  comments: CommentI[] | null;
  onCommentDelete: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentDelete }) => {
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
