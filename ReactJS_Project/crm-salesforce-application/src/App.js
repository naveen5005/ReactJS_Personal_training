import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registration';
import Login from './Components/Login';
import Students from './Components/Students';
import ProtectedRoute from './Authentication/ProtectedRoute';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { AuthContext } from './Authentication/AuthContext';
function App() {
  return (
    <Router>
      <AuthContext>
        <NavBar />
        <Routes>
          <Route path='/' element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Student' element={<ProtectedRoute>
            <Students />
          </ProtectedRoute>} />
        </Routes>
      </AuthContext>
    </Router>
  );
}

export default App;
