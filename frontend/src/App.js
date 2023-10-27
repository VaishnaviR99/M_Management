import './App.css';
import AllRoutes from './routes/Allroutes';
import MyNavbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';

function App() {
  const[login,setlogin]=useState(true)
  return (
    <div className='mainhome' >
<AllRoutes/>


    </div>
  );
}

export default App;
