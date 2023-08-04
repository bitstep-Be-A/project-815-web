import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './pages';
import People from './pages/people';
import Upload from './pages/upload';
import Result from './pages/result';
import NotFound from './pages/NotFound';
import Landing from './pages/landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/people"} element={<People/>}/>
        <Route path={"/upload"} element={<Upload/>}/>
        <Route path={"/result"} element={<Result/>}/>
        <Route path={"/result/:id"} element={<Result/>}/>
        <Route path={"/landing"} element={<Landing/>}/>
        <Route path={"/*"} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
