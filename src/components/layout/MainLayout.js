import React from 'react';
import Header from './Header';

function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
    </React.Fragment>
  );
}

export default MainLayout;
