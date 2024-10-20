import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Read from './components/Read';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Months from './components/Months';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';  // Add the ProtectedRoute component

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/' element={<Months />} /> */}
        
        {/* Protect the Create and Read routes */}
        <Route path='/' element={<ProtectedRoute component={Months} />} />
        <Route path='/create' element={<ProtectedRoute component={Create} />} />
        <Route path='/read/:month' element={<ProtectedRoute component={Read} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
