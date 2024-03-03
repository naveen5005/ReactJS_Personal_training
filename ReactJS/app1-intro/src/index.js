import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Naveen } from './Naveen';
import { NaveenClassComp } from './NaveenClassComp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Naveen/> */}
    {/* <NaveenClassComp/> */}
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
