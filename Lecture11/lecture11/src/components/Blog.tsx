"use client";
import React, { useEffect, useMemo } from 'react';
import { Container } from '@mui/material';
import PaginatorWrapper from './helpers/PaginatorWrapper';
import { useSocket } from '../hooks/useSocket';
import useToast from '../hooks/useToast';
import Exhibits from './Posts/Exhibits';
import { Toaster } from 'react-hot-toast';
import { BlogPropsI } from '@/Interfaces/BlogPropsI';

const Blog: React.FC<BlogPropsI> = ({ initialExhibits, page, lastPage, showToaster }) => {
  const { newPostData } = useSocket();
  const { newExhibitNotification } = useToast();

  const isExhibitDataAvailable = useMemo(() => initialExhibits && initialExhibits.length > 0, [initialExhibits]);

  useEffect(() => {
    if (showToaster && newPostData) {
      newExhibitNotification(`${newPostData.user} created a new post`);
    }
  }, [newPostData, newExhibitNotification, showToaster]);

  const paginator = useMemo(
    () => <PaginatorWrapper page={page} lastPage={lastPage} />,
    [page, lastPage]
  );

  return (
    <Container sx={{ py: 8 }}>
      <Toaster />
      {paginator}
      <Exhibits exhibits={initialExhibits} loading={!isExhibitDataAvailable} />
      {paginator}
    </Container>
  );
};

export default Blog;
