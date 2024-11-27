import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { memo } from 'react';
import { ExpandMoreButtonPropsI } from '@/Interfaces/ExpandMoreButtonPropsI';

const ExpandMoreButton: React.FC<ExpandMoreButtonPropsI> = ({ expanded, onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.4s",
                marginLeft: "auto",
            }}
        >
            <ExpandMoreIcon />
        </IconButton>
    );
}

export default memo(ExpandMoreButton);
