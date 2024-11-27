import { Avatar, Box, CardContent, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React, { memo } from 'react';
import { useDate } from '../../hooks/useDate';
import { AvatarHeaderPropsI } from '@/Interfaces/AvatarHeaderPropsI';

const AvatarHeader: React.FC<AvatarHeaderPropsI> = ({
  username,
  createdAt,
  avatarSize = 50,
  usernameFontSize = '16px',
  usernameVariant = 'h6',
  usernameFontWeight = 'medium',
  dateFontSize = '0.8rem',
  dateVariant = 'body2',
  dateFontStyle = 'normal',
  padding = 1,
  marginRight = 1
}) => {
  const firstLetter = username[0].toUpperCase();
  const formattedDate = useDate(createdAt);

  const avatarStyle = { width: avatarSize, height: avatarSize, mr: marginRight, bgcolor: deepOrange[500], fontSize: avatarSize * 0.5 };
  const usernameStyle = { fontSize: usernameFontSize, fontWeight: usernameFontWeight }; 
  const dateStyle = { fontSize: dateFontSize, fontStyle: dateFontStyle };

  return (
    <CardContent sx={{ display: "flex", alignItems: "center", padding: padding }}>
      <Avatar alt={username} sx={avatarStyle}>
        {firstLetter}
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant={usernameVariant} sx={usernameStyle}>
          {username}
        </Typography>
        <Typography variant={dateVariant} color="text.secondary" sx={dateStyle}>
          {formattedDate}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default memo(AvatarHeader);
