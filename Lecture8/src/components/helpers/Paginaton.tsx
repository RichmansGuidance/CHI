import { Pagination } from "@mui/material";
import React from "react";
import { PaginatonPropsI } from '../../Interfaces/PaginationProps';

const Paginaton: React.FC<PaginatonPropsI> = ({ page, lastPage, handlePageChange }) => {
    return (
        <>
            <Pagination
                count={lastPage}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </>
    )
}

export default Paginaton;