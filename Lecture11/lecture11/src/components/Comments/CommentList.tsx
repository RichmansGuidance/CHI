import { Typography } from "@mui/material";
import React from "react";
import Comment from "./Comment";
import { CommentListPropsI } from "@/Interfaces/CommentListPropsI";

const CommentList: React.FC<CommentListPropsI> = ({ comments, onCommentDelete }) => {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onCommentDelete={onCommentDelete}/>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments yet.
        </Typography>
      )}
    </>
  );
};

export default CommentList;
