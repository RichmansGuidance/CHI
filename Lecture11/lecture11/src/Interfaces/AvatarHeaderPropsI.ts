import {TypographyProps } from '@mui/material';

export interface AvatarHeaderPropsI {
    username: string;
    createdAt: string;
    avatarSize?: number;
    usernameFontSize?: string;
    usernameFontWeight?: string; 
    usernameVariant?: TypographyProps['variant'];
    dateFontSize?: string;
    dateVariant?: TypographyProps['variant'];
    dateFontStyle?: string;
    padding?: number;
    marginRight?: number;
  }