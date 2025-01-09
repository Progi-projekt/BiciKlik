import React from 'react';
import './App.css';
import Heading from './components/heading';
import Footer from './components/footer';
import NewsFeed from './pages/NewsFeed';
import Loginsignup from './pages/LoginSignUp';
import Chat from './pages/Chat';
import ClickedEvent from './pages/ClickedEvent';
import CreateRoute from './pages/CreateRoute';

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
      <Route path='/event/:event_id' element={<ClickedEvent/>}/>  
      <Route path='/createRoute' element={<CreateRoute/>}/>
      </Routes>
      <div className="footer">
      <Footer></Footer>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
