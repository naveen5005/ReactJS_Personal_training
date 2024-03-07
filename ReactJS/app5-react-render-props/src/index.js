import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClickCounter_Func from './Components/ClickCounter_Func';
import HoverCounter_Func from './Components/HoverCounter_Func';
import Reusable_Func from './Components/Reusable_Func';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ClickCounter_Func/>  
    <HoverCounter_Func/> */}
    <Reusable_Func render={(counter, incrementCount, decrementCount, resetCount) => {
      return (
        <ClickCounter_Func
          counter={counter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          resetCount={resetCount} />
      )
    }} />

    <Reusable_Func render={(counter, incrementCount, decrementCount, resetCount) => {
      return (
        <HoverCounter_Func
          counter={counter}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          resetCount={resetCount}
        />
      )
    }} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
