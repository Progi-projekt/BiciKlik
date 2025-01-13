import React from 'react';
import './App.css';
import Heading from './components/heading';
import Footer from './components/footer';
import NewsFeed from './pages/NewsFeed';
import Loginsignup from './pages/LoginSignUp';
import Chat from './pages/Chat';
import ClickedEvent from './pages/ClickedEvent';
import CreateRoute from './pages/CreateRoute';
import NotFound from './pages/NotFound';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Newsfeed from './pages/NewsFeed';

function App() { 
  return (
    <BrowserRouter>
    <div className="App">
      <Heading/>
      <Routes>      
      <Route path='/' element={<Newsfeed/>}/>
      <Route path='/login' element={<Loginsignup/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/event/:event_id' element={<ClickedEvent/>}/>  
      <Route path='/createRoute' element={<CreateRoute/>}/>
      <Route path='*' element={<NotFound/>}/>  {/*Catch-all route for 404 */}
      </Routes>
      <div className="footer">
      <Footer></Footer>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
