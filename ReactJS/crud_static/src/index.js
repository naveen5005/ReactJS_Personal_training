import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClassCRUD01 from './components/ClassCRUD01';
import FuncCRUD01 from './components/FuncCRUD01';
import ClassCRUD02 from './components/ClassCRUD02';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ClassCRUD01/> */}
    {/* <FuncCRUD01/> */}
    <ClassCRUD02/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
