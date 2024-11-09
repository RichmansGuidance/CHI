export interface PaginationWrapperPropsI {
    page: number;
    lastPage: number;
    onChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  }