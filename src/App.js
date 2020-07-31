import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Routers from './Routers';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routers />
      </main>
    </Router>
  );
}

export default App;
