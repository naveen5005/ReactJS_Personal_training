import logo from './logo.svg';
import './App.css';
import { useContext } from 'react'
import AuthContext, { Context } from './Components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Products from './Components/Products';

const routes = [
  {
    path: "/", element: <ProtectedRoute><Main /></ProtectedRoute>
  },
  {
    path: '/login', element: <Login />
  },
  {
    path: '/products', element: <ProtectedRoute><Products /></ProtectedRoute>
  }
]
function App() {
  return (
    <div className="App">
      <Router>
        <AuthContext>
          <Routes>
            {
              routes.map((route) => (
                <Route key={route.path} {...route} />
              ))
            }
            {/* <Route path='/' element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products/>}/> // comment it
            <Route path='/products' element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } /> */}
          </Routes>
        </AuthContext>
      </Router>
    </div>
  );
}

export default App;
