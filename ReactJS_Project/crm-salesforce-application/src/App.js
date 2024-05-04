import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registration';
import Login from './Components/Login';
import ProtectedRoute from './Authentication/ProtectedRoute';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { AuthContext } from './Authentication/AuthContext';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import OrderScreen from './Components/OrderScreen';
function App() {
  return (
    <Router>
      <AuthContext>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element ={<Cart/>}/>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>}/>
          <Route path='/order' element={<OrderScreen/>}/>
        </Routes>
      </AuthContext>
    </Router>
  );
}

export default App;
