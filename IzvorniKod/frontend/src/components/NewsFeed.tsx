import React from 'react';
import "./neewsfeed.css";
import headerNewsFeed from 'HeaderNewsFeed.png';
import routeImg from 'R.png';

const newsfeed =() => {
    return (
      <div className="newsfeed">
         <img src={headerNewsFeed} alt='NewsFeed' className='slikanews'/>
         <p className='filter'>Filter</p>
         <div className='containerRuta'>
         <div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div>
         <div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div><div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div><div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div><div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div><div className='ruta'>
          <div className='tekst'>
          <p className='nazivRute'>Naziv rute</p>
          <p className='vrijemeDatum'>Datum, vrijeme</p>
          <p>podnaslov rute što nešto objašnjuje</p>
          <img src={routeImg} alt='RouteImg' className='slikarute'></img>
          </div>
         </div>
         
         </div>
      </div>
    );
  }
  export default newsfeed;