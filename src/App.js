import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Read from './components/Read';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Months from './components/Months';

function App() {

  return (
    <BrowserRouter>
     <Navbar />
    <Routes>
   
    <Route path='/' element={<Months />} > </Route>
    <Route path='/create' element={<Create />}> </Route>
    {/* <Route path='/update/:month' element={<Update />}> </Route> */}
    <Route path='/read/:month' element={<Read />}> </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
