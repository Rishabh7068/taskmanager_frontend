import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './component/Home'
import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import EmailVerification from './component/EmailVerification';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={ <Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={ <Dashboard/>} />
      </Routes>
      <Routes>
        <Route path="/email-verification" element={ <EmailVerification/>} />
      </Routes>
    </Router>
  );
}

export default App
