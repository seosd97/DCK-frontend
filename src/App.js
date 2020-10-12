import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routers from './Routers';

import { DDragonProvider, store } from './context/context';

function App() {
  return (
    <DDragonProvider>
      <Router>
        <Routers />
      </Router>
    </DDragonProvider>
  );
}

export default App;
