import React from 'react';
import { ExhibitActions } from '../api/exhibitsActions';
import Home from '../components/Home';

const HomePage: React.FC = () => {
  return <Home fetchExhibits={ExhibitActions.exhibits}/>
}

export default HomePage;