import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ExhibitI } from '../Interfaces/ExhibitI';
import { useRequest } from 'ahooks';
import { CircularProgress, Typography, Container, Box } from '@mui/material';
import Post from './Posts/Post';
import { HomePropsI } from '../Interfaces/HomeI';
import Notification from './Notification';

const Home: React.FC<HomePropsI> = ({ fetchExhibits }) => {
  const [exhibits, setExhibits] = useState<ExhibitI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  const { run: loadExhibits, loading, error } = useRequest(
    () => fetchExhibits(page, limit),
    {
      onSuccess: (response) => {
        setExhibits((prevExhibits) => 
          page === 1 ? response.data.data : [...prevExhibits, ...response.data.data]
        );
        setHasMore(response.data.data.length === limit);
      },
    }
  );

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  const handleNewPost = useCallback(() => {
    if (page === 1) {
      setExhibits([]);  
      loadExhibits();
    }
  }, [page, loadExhibits]);

  useEffect(() => {
    loadExhibits();
  }, [page, loadExhibits]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null, rootMargin: '20px', threshold: 1.0
    });

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect(); 
    };
  }, [handleObserver]);

  const renderMessage = useCallback((message: string) => (
    <Typography color="textSecondary" align="center">
      {message}
    </Typography>
  ), []);

  if (error) {
    return renderMessage('Can not load exhibits. Please try again later.');
  }

  return (
    <Container sx={{ py: 8 }}>
      <Notification onNewPost={handleNewPost} />

      {exhibits.map((exhibit) => (
        <Post key={exhibit.id} exhibit={exhibit} loadExhibits={loadExhibits} />
      ))}

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />}

      {!loading && hasMore && (
        <Box ref={loaderRef} sx={{ height: '40px', display: 'flex', justifyContent: 'center' }} />
      )}

      {!hasMore && renderMessage('No exhibits left')}
    </Container>
  );
};

export default React.memo(Home);
