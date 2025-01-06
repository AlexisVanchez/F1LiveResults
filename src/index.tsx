import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CarData from "./components/CarData/CarData"
import Intervals from "./components/Intervals/Intervals"
import RaceControl from "./components/RaceControl/RaceControl"
import TeamRadio from "./components/TeamRadio.tsx/TeamRadio"
import Weather from "./components/Weather/Weather"
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './components/Main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/cardata" element={<CarData/>}/>
      <Route path="/intervals" element={<Intervals/>}/>
      <Route path="/racecontrol" element={<RaceControl/>}/>
      <Route path="/weather" element={<Weather/>}/>
      <Route path="/teamradio" element={<TeamRadio />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
