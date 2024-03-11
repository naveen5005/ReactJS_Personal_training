import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import NavBar from './Components/NavBar';
import PageNotFound from './Components/PageNotFound';
import Contacts from './Components/Contacts';
import Users from './Components/Users';
import UserDetail from './Components/UserDetail';
import UserDetailsForm from './Components/UserDetailsForm';
import Footer from './Components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contacts />} />
        <Route path='/users' element={<Users />}>
          {/* <Route path=':id' element={<UserDetail />} /> */}
        </Route>
        <Route path='/users/:id' element={<UserDetail/>}/>
        <Route path='/userDetail/:id' element={<UserDetailsForm/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
