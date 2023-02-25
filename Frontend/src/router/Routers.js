import React from 'react'
import {Routes,Route,} from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList  from "../pages/SearchResultList";
import ThankYou from '../pages/ThankYou';
import About from '../pages/About';
// import Dummy from '../components/dummy/Dummy';


const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>} />   landing page pe se sida homepage ki request dedo
      <Route path='/home' element={<Home/>} />
      <Route path='/tours' element={<Tours/>} />
      <Route path='/tours/:id' element={<TourDetails/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/thank-you' element={<ThankYou/>} />
      <Route path='/tours/search' element={<SearchResultList/>} />
      <Route path='/about' element={<About/>} />

    </Routes>
  )
}

export default Router