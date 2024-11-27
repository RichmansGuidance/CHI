import { CardActions, IconButton } from "@mui/material";
import React from "react";
import ExpandMoreButton from "../helpers/ExpandMoreButton";
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { ActionsBarPropsI } from '../../Interfaces/ActionBarI';

const ActionsBar: React.FC<ActionsBarPropsI> = React.memo(({ expanded, toggleExpand, showAddComment, toggleAddComment, onDelete, isOwner, isDeleting }) => {
    return (
        <CardActions>
            <ExpandMoreButton expanded={expanded} onClick={toggleExpand} />
            <IconButton 
                onClick={toggleAddComment} 
                color={showAddComment ? "primary" : "default"}
            >
                <AddCommentIcon />
            </IconButton>
            {isOwner && (
                <IconButton onClick={onDelete} color="error" disabled={isDeleting}>
                    <DeleteForeverRoundedIcon />
                </IconButton>
            )}
        </CardActions>
    );
});

export default ActionsBar;
