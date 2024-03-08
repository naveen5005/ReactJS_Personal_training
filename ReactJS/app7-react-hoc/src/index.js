import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClickCounter from './Components/ClickCounter';
import HoverCounter from './Components/HoverCounter';
import ClickCounterFunc from './Components/Func_Comp/ClickCounterFunc';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ClickCounter/>
    <HoverCounter/> */}

    <ClickCounterFunc/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
