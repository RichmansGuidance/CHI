import { Box } from "@mui/material";
import Paginator from "./Paginator";
import { PaginatorWrapperPropsI } from "@/Interfaces/PaginatorWrapperPropsI";
  
const PaginatorWrapper: React.FC<PaginatorWrapperPropsI> = ({ page, lastPage }) => {
    return lastPage > 1 ? (
        <Box mb={6} display="flex" justifyContent="center">
            <Paginator page={+page} lastPage={lastPage} navigationPath="/exhibits?page="/>
        </Box>
    ) : null;
};


export default PaginatorWrapper;