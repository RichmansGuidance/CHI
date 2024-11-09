export interface PaginatonPropsI {
    page: number
    lastPage: number
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}
