import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';

const API_URL = 'https://rickandmortyapi.com/api/character';

const CharacterList = ({ onRowClick }) => {
    const [characters, setCharacters] = useState([]);
    const [{ loading, error }, setStatus] = useState({ loading: true, error: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const fetchCharacters = useCallback(async (page) => {
        setStatus({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}?page=${page}`);
            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            setStatus({ loading: false, error: "Error fetching characters" });
            console.error("Error fetching characters:", error);
        } finally {
            setStatus((prev) => ({ ...prev, loading: false }));
        }
    }, []);

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage, fetchCharacters]);

    const handleRowClick = (params) => {
        onRowClick(params.id);
    };

    const handlePagination = (direction) => {
        setCurrentPage((prev) => Math.min(Math.max(prev + direction, 1), totalPages));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {loading && <div id="loading">Loading…</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <>
                    <DataGrid 
                        rows={characters} 
                        columns={columns} 
                        pageSize={5} 
                        onRowClick={handleRowClick} 
                        sx={{
                            width: '100%',
                            '& .MuiDataGrid-row': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333' : '#fff',
                                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
                            },
                            '& .MuiDataGrid-row.selected': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#6a0dad' : '#e0e0e0',
                                color: '#6a0dad', 
                            },
                            '& .MuiDataGrid-header': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#eee',
                                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#eee',
                                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
                            },
                            '& .MuiDataGrid-selectedRowCount': {
                                color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#000',
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
