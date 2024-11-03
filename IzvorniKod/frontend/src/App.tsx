import React from 'react';
import './App.css';
import Heading from 'components/heading';
import Footer from 'components/footer';
import NewsFeed from 'components/NewsFeed';

function App() {
  return (
    <div className="App">
      <Heading/>
      <NewsFeed/>
      <Footer/>
    </div>
  );
}

export default App;
