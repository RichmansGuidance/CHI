import { Typography } from "@mui/material";
import React, { memo } from "react";
import { MessagePropsI } from "@/Interfaces/MessagePropsI";

const Message: React.FC<MessagePropsI> = ({ text }) => (
  <Typography color="textSecondary" align="right">
    {text}
  </Typography>
);

export default memo(Message);
