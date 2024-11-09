import React, { useState, useCallback } from 'react';
import { ExhibitI } from '../Interfaces/ExhibitI';
import { useRequest } from 'ahooks';
import { CircularProgress, Typography, Container } from '@mui/material';
import Post from './Posts/Post';
import { useSearchParams } from 'react-router-dom';
import PaginatonWrapper from './helpers/PaginatonWrapper';
import { HomePropsI } from '../Interfaces/HomeI';


const Home: React.FC<HomePropsI> = ({ fetchExhibits }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exhibits, setExhibits] = useState<ExhibitI[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const { run: loadExhibits, loading, error } = useRequest(() => fetchExhibits(page, limit), {
    refreshDeps: [page],
    onSuccess: (response) => {
      setExhibits(response.data.data);
      setLastPage(response.data.lastPage);
    }
  });

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setSearchParams({ page: newPage.toString(), limit: limit.toString() });
    },
    [limit, setSearchParams]
  );

  const renderMessage = (message: string) => (
    <Typography color="textSecondary" align="center">
      {message}
    </Typography>
  );

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
  }

  if (error) {
    return renderMessage('Can not load exhibits. Please try again later.');
  }

  if (exhibits.length === 0) {
    return renderMessage('There are no posts yet');
  }

  return (
    <Container sx={{ py: 8 }}>
      {lastPage > 1 && (
        <PaginatonWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
      )}

      {exhibits.map((exhibit) => (
        <Post key={exhibit.id} exhibit={exhibit} loadExhibits={loadExhibits} />
      ))}

      {lastPage > 1 && (
        <PaginatonWrapper page={page} lastPage={lastPage} onChange={handlePageChange} />
      )}
    </Container>
  );
};

export default Home;
