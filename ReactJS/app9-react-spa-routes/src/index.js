import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './Components/Home';
// import About from './Components/About';
import NavBar from './Components/NavBar';
import PageNotFound from './Components/PageNotFound';
// import Contacts from './Components/Contacts';
// import Users from './Components/Users';
// import UserDetail from './Components/UserDetail';
// import UserDetailsForm from './Components/UserDetailsForm';
import Footer from './Components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Imports components lazily
const Home = lazy(()=> import('./Components/Home'));
const About = lazy(()=> import('./Components/About'));
const Contacts = lazy(()=>import('./Components/Contacts'));
const Users = lazy(()=> import('./Components/Users'));
const UserDetail = lazy(() => import('./Components/UserDetail'));
const UserDetailsForm = lazy(() => import('./Components/UserDetailsForm'));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>} />
        <Route path='/about' element={<Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>} />
        <Route path='/contact' element={<Suspense fallback={<div>Loading...</div>}>
          <Contacts />
        </Suspense>} />
        <Route path='/users' element={<Suspense fallback={<div>Loading...</div>}>
          <Users />
        </Suspense>}>
          {/* <Route path=':id' element={<UserDetail />} /> */}
        </Route>
        <Route path='/users/:id' element={<Suspense fallback={<div>Loading...</div>}>
          <UserDetail/>
        </Suspense>}/>
        <Route path='/userDetail/:id' element={<Suspense fallback={<div>Loading...</div>}>
          <UserDetailsForm/>
        </Suspense>}/>
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
