import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClassComp01 from './Components/ClassComp01';
import ReusableComp from './Components/ReusableComp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ClassComp01/> */}
    <ReusableComp render = {(commonServerCommunication,persons)=> <ClassComp01
      commonServerCommunication={commonServerCommunication}
      persons = {persons}
    />}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
