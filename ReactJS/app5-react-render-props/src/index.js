import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClickCounter_Func from './Components/ClickCounter_Func';
import HoverCounter_Func from './Components/HoverCounter_Func';
import Reusable_Func from './Components/Reusable_Func';
import ClickCounter_Class from './Components/Class/ClickCounter_Class';
import Reusable_Class from './Components/Class/Reusable_Class';
import HoverCounter_Class from './Components/Class/HoverCounter_Class';

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

    {/* <ClickCounter_Class/> */}
    <Reusable_Class render={(counter, incrementCounter, decrementCounter, resetCounter) =>
      <ClickCounter_Class
        counter={counter}
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
        resetCounter={resetCounter}
      />} />


    <Reusable_Class render={(counter, incrementCounter, decrementCounter, resetCounter) => <HoverCounter_Class
      counter={counter}
      incrementCounter={incrementCounter}
      decrementCounter={decrementCounter}
      resetCounter={resetCounter}
    />} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
