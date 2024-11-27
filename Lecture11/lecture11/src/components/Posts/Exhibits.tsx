import React, { memo } from "react";
import { CircularProgress, Box } from "@mui/material";
import Exhibit from "./Exhibit";
import Message from "../helpers/Message";
import { ExhibitsPropsI } from "@/Interfaces/ExhibitsPropsI";

const MemoizedExhibit = memo(Exhibit);

const Exhibits: React.FC<ExhibitsPropsI> = ({ exhibits, loading }) => {
    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
    if (exhibits.length === 0) return <Message text="No exhibits found.!" />;

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {exhibits.map((exhibit) => (
                <MemoizedExhibit key={exhibit.id} exhibit={exhibit} />
            ))}
        </Box>
    );
};

export default Exhibits;
