import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registration from './Components/Registration';
import Login from './Components/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
