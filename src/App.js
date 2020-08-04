import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import Routers from './Routers';

function App() {
  return (
    <Router>
      <Routers />
    </Router>
  );
}

export default App;
