import React, { useCallback, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Collapse,
} from "@mui/material";
import { useRequest } from "ahooks";
import { CommentsActions } from "../../api/commentsActions";
import { CommentI } from "../../Interfaces/CommentI";
import AddCommentForm from "../Comments/AddCommentForm";
import CommentList from "../Comments/CommentList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ExhibitActions } from "../../api/exhibitsActions";
import AvatarHeader from "./AvatarHeader";
import ActionsBar from "./ActionsBar";
import { API_BASE_URL } from "../../utils/API_URL";
import { PostPropsI } from '../../Interfaces/PostI';


const Post: React.FC<PostPropsI> = React.memo(({ exhibit, loadExhibits }) => {
  const [comments, setComments] = useState<CommentI[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const { run: loadComments, loading: commentsLoading, error } = useRequest(
    () => CommentsActions.comments(exhibit.id).then(res => res.data),
    { onSuccess: setComments }
  );

  const { run: removeExhibit, loading: removeLoading } = useRequest(
    () => ExhibitActions.deleteExhibit(exhibit.id),
    { manual: true, onSuccess: loadExhibits }
  );

  const onCommentAdd = useCallback(() => {
    loadComments();
    setShowAddComment(false);
  }, [loadComments]);

  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);
  const toggleAddComment = useCallback(() => setShowAddComment(prev => !prev), []);
  const isExhibitOwner = useMemo(() => userId === exhibit.user.id, [userId, exhibit.user.id]);

  return (
    <Card key={exhibit.id} sx={{ boxShadow: 3, maxWidth: 800, display: 'block', mx: 'auto', mb: 3 }}>
      <AvatarHeader username={exhibit.user.username} createdAt={exhibit.createdAt} />
      <CardMedia component="img" image={`${API_BASE_URL}${exhibit.imageUrl}`} alt="Exhibit image" sx={{ width: "100%", objectFit: "cover", borderRadius: "4px 4px 0 0" }} />
      <CardContent>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>{exhibit.description}</Typography>
        <Typography variant="h6" color="textPrimary" sx={{ mb: 2 }}>{comments ? `${comments.length} comments` : "No comments yet."}</Typography>
        {commentsLoading && <Box display="flex" justifyContent="center" mt={2}><CircularProgress /></Box>}
        {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>Failed to load comments. Please try again.</Typography>}
        <ActionsBar expanded={expanded} toggleExpand={toggleExpand} showAddComment={showAddComment} toggleAddComment={toggleAddComment} onDelete={removeExhibit} isOwner={isExhibitOwner} isDeleting={removeLoading} />
        <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ mt: 2 }}><CommentList comments={comments} onCommentDelete={loadComments} /></Collapse>
        {showAddComment && <AddCommentForm exhibitID={exhibit.id} onSuccess={onCommentAdd} />}
      </CardContent>
    </Card>
  );
});

export default Post;
