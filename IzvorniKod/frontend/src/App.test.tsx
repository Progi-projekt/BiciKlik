import React from 'react';
import './App.css';
import Heading from './components/heading';
import Footer from './components/footer';
import LoginSignUp from './components/LoginSignUp';

function App() {
  return (
    <div className="AppTest">
      <Heading/>
      <LoginSignUp/>
      <Footer/>
    </div>
  );
}

export default App;
