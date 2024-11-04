import React, { useState, useMemo } from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { fetchCharacters, Character } from '../api/characterApi';
import { useRequest } from 'ahooks';

interface CharacterListProps {
    onRowClick: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ onRowClick }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, loading, error } = useRequest(() => fetchCharacters(currentPage), {
        refreshDeps: [currentPage],
    });

    const characters = data?.results || [];
    const totalPages = data?.info.pages || 0;

    const handleRowClick = (params: GridRowParams) => {
        if (params.id) onRowClick(Number(params.id));
    };

    const handlePagination = (direction: number) => {
        setCurrentPage(prev => Math.max(1, Math.min(prev + direction, totalPages)));
    };

    const columns: GridColDef[] = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'species', headerName: 'Species', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 100 },
    ], []);

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading && <div id="loading">Loading…</div>}
            {error && <div className="error">{error.message || "Error fetching characters"}</div>}
            {!loading && !error && (
                <>
                    <DataGrid
                        rows={characters.map(({ id, name, status, species, gender }) => ({
                            id, name, status, species, gender
                        }))}
                        columns={columns}
                        paginationModel={{ pageSize: 20, page: currentPage - 1 }}
                        rowCount={totalPages * 20}
                        paginationMode="server"
                        onPaginationModelChange={(model) => setCurrentPage(model.page + 1)}
                        onRowClick={handleRowClick}
                        sx={{
                            width: '100%',
                            '& .MuiDataGrid-row': {
                                bgcolor: theme => theme.palette.mode === 'dark' ? '#333' : '#fff',
                                color: theme => theme.palette.text.primary,
                            },
                            '& .MuiDataGrid-row:hover': {
                                bgcolor: theme => theme.palette.action.hover,
                            },
                            '& .MuiDataGrid-row.selected': {
                                bgcolor: theme => theme.palette.action.selected,
                                color: '#6a0dad',
                            },
                            '& .MuiDataGrid-header, & .MuiDataGrid-footerContainer': {
                                bgcolor: theme => theme.palette.background.paper,
                                color: theme => theme.palette.text.primary,
                            },
                        }}
                    />

                    <div className="pagination" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                        <Button
                            variant="contained"
                            onClick={() => handlePagination(-1)}
                            disabled={currentPage === 1}
                            sx={{ marginRight: '8px' }}
                        >
                            Previous
                        </Button>

                        <span>{currentPage} / {totalPages}</span>

                        <Button
                            variant="contained"
                            onClick={() => handlePagination(1)}
                            disabled={currentPage === totalPages}
                            sx={{ marginLeft: '8px' }}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterList;
