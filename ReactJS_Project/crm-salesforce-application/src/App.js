import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registration';
import Login from './Components/Login';
import Students from './Components/Students';
import AuthContext from './Authentication/AuthContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
function App() {
  return (
    <Router>
      <AuthContext>
        <Routes>
          <Route path='/' element={<Registration />} />
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
