import logo from './logo.svg';
import 'react-router-dom'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import User from './components/User';
import Viewallemp from './components/Viewallemp';

function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/' element ={<User/>}/>
      <Route path='/viewallemp' element={<Viewallemp/>}/>
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
