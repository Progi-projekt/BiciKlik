import React from 'react';
import './App.css';
import Heading from './components/heading';
import Footer from './components/footer';
import NewsFeed from './pages/NewsFeed';
import Loginsignup from './pages/LoginSignUp';
import Chat from './pages/Chat';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Heading/>
      <Routes>      
      <Route path='/' element={<NewsFeed/>}/>
      <Route path='/login' element={<Loginsignup/>}/>
      <Route path='/chat' element={<Chat/>}/>
      </Routes>
      <div className="footer">
      <Footer></Footer>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
