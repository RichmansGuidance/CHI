import { CommentI } from './CommentI'

export interface CommentListPropsI {
    comments: CommentI[] | null;
    onCommentDelete: () => void;
  }