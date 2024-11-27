import { CommentI } from './CommentI';

export interface CommentPropsI {
    comment: CommentI;
    onCommentDelete: () => void;
  }