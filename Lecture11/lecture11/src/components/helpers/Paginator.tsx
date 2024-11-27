import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import { PaginatorPropsI } from "@/Interfaces/PaginatorPropsI";

const Paginator: React.FC<PaginatorPropsI> = ({ page, lastPage, navigationPath }) => (
    <Pagination
        count={lastPage}
        page={page}
        color="primary"
        renderItem={(item) => {
            const href =
                item.type === "previous"
                    ? `${navigationPath}${page - 1}`
                    : item.type === "next"
                    ? `${navigationPath}${page + 1}`
                    : `${navigationPath}${item.page}`;

            return (
                <PaginationItem
                    {...item}
                    component={Link}
                    href={href}
                    disabled={
                        (item.type === "previous" && page === 1) ||
                        (item.type === "next" && page === lastPage)
                    }
                />
            );
        }}
    />
);

export default Paginator;
