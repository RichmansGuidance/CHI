import React from "react";
import { Box } from "@mui/material";
import Paginaton from "./Paginaton";
import { PaginationWrapperPropsI } from '../../Interfaces/PaginationWrapperProps';
 
const PaginationWrapper: React.FC<PaginationWrapperPropsI> = ({ page, lastPage, onChange }) => (
    <Box mb={6} display="flex" justifyContent="center">
        <Paginaton page={page} lastPage={lastPage} handlePageChange={onChange} />
    </Box>
);

export default PaginationWrapper;