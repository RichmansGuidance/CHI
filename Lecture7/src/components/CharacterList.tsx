import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { DataGrid, GridRowParams, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { fetchCharacters, Character } from '../api/characterApi';

interface CharacterListProps {
    onRowClick: (id: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ onRowClick }) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

    const fetchCharacterData = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCharacters(page);
            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (err) {
            setError((err as Error).message || "Error fetching characters");
            console.error("Error fetching characters:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCharacterData(currentPage);
    }, [currentPage, fetchCharacterData]);

    const handleRowClick = (params: GridRowParams) => {
        if (params.id) onRowClick(Number(params.id));
    };

    const handlePagination = (direction: number) => {
        setCurrentPage(prev => Math.max(1, Math.min(prev + direction, totalPages!)));
    };

    // кинув колонки в мемо оскільки цей масив по суті є статичним і не потрібно його перестворювати при кожному рендері
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
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <>
                    <DataGrid
                        rows={characters.map(({ id, name, status, species, gender }) => ({
                            id, name, status, species, gender
                        }))}
                        columns={columns}
                        paginationModel={{ pageSize: 20, page: currentPage - 1 }}
                        rowCount={totalPages ? totalPages * 20 : 0}
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
