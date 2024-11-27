import { IconButtonProps } from "@mui/material";

export interface ExpandMoreButtonPropsI extends IconButtonProps {
    expanded: boolean;
    onClick: () => void;
}
