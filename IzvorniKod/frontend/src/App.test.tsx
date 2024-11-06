import React from 'react';
import './App.css';
import Heading from './components/heading';
import Footer from './components/footer';
import LoginSignUp from './components/LoginSignUp';

function App() {
  return (
    <div className="App">
      <Heading />
      <div className="content">
        <LoginSignUp />
      </div>
      <Footer />
    </div>
  );
}

export default App;
