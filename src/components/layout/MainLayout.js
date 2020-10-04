import React from 'react';
import Footer from './Footer';
import Header from './Header';

function MainLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default MainLayout;
