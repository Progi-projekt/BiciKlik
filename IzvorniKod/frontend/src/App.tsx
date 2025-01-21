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
import CreateEvent from './pages/CreateEvent';
import Routess from './pages/Routes';
import OrganiserRoutes from './components/OrganiserRoutes';
import NotAllowed from './pages/NotAllowed';
import UserRoutes from './components/UserRoutes';
import AdminRoutes from './components/AdminRoutes';
import AdminPanel from './pages/AdminPanel';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Newsfeed from './pages/NewsFeed';

function App() { 
  return (
    <BrowserRouter>
    <div className="App">
      <Heading/>
      <Routes>
        <Route element={<AdminRoutes/>}> {/* Routes for admins */}
          <Route path='/adminPanel' element={<AdminPanel/>}/>
        </Route>

        <Route element={<OrganiserRoutes/>}> {/* Routes for organisers or up */}
          <Route path='/createEvent' element={<CreateEvent/>}/>
        </Route>

        <Route element={<UserRoutes/>}>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/event/:event_id' element={<ClickedEvent/>}/>\
          <Route path='/createRoute' element={<CreateRoute/>}/>
          <Route path='/myroutes' element={<Routess/>}/>
        </Route>

        <Route path='/' element={<Newsfeed/>}/>
        <Route path='/notAllowed' element={<NotAllowed/>}/>
        <Route path='/login' element={<Loginsignup/>}/>
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
