import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AccountsAndBudgets from "../pages/AccountsAndBudget";
import Home from "../pages/Home";
import MyNavbar from "../components/Navbar";
import Records from "../components/records";
import Budgets from "../pages/Budgets";
import Statistics from "../pages/statistics";
import PrivateRoute from "./privateRoute";


export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<div><PrivateRoute><MyNavbar/><Home/></PrivateRoute></div>}/>
            <Route path="/records" element={<div><PrivateRoute><MyNavbar/><Records/></PrivateRoute></div>}/>
            <Route path="/budgets" element={<div><PrivateRoute><MyNavbar/><Budgets/></PrivateRoute></div>}/>
            <Route path="/statistics" element={<div><PrivateRoute><MyNavbar/><Statistics/></PrivateRoute></div>}/>
        </Routes>
    )
}