
import './home.css';
import MyNavbar from '../components/Navbar';
import Home from './Home';
import { useState } from 'react';
import Records from '../components/records';
export default function AccountsAndBudgets(){
    
    const[route,setroute]=useState("home")
    function changestate(newroute){
   setroute(newroute)
    }
    return(
        <div className='d-flex'>
            <MyNavbar changestate={changestate} />
           {route=="home"?<Home  />:<Records/>}
      </div>
    )
}