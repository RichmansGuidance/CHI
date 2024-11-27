import { CardActions, IconButton } from "@mui/material";
import React, { useCallback } from "react";
import ExpandMoreButton from "../helpers/ExpandMoreButton";
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { ActionsBarPropsI } from "@/Interfaces/ActionBarPropsI";

const ActionsBar: React.FC<ActionsBarPropsI> = React.memo(({ expanded, toggleExpand, showAddComment, toggleAddComment, onDelete, isOwner, isDeleting }) => {
    const memoizedToggleExpand = useCallback(() => {
        toggleExpand();
    }, [toggleExpand]);

    const memoizedToggleAddComment = useCallback(() => {
        toggleAddComment();
    }, [toggleAddComment]);

    const memoizedOnDelete = useCallback(() => {
        onDelete();
    }, [onDelete]);

    return (
        <CardActions>
            <ExpandMoreButton expanded={expanded} onClick={memoizedToggleExpand} />
            <IconButton 
                onClick={memoizedToggleAddComment} 
                color={showAddComment ? "primary" : "default"}>
                <AddCommentIcon />
            </IconButton>
            {isOwner && (
                <IconButton onClick={memoizedOnDelete} color="error" disabled={isDeleting}>
                    <DeleteForeverRoundedIcon />
                </IconButton>
            )}
        </CardActions>
    );
});

export default ActionsBar;
