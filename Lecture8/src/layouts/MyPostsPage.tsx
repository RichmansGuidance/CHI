import React from 'react';
import { ExhibitActions } from '../api/exhibitsActions';
import Home from '../components/Home';

const MyPostsPage: React.FC = () => {
  return <Home fetchExhibits={ExhibitActions.myExhibits}/>;
};

export default MyPostsPage;