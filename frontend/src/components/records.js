import { useEffect, useState } from "react";
import MyNavbar from "./Navbar";
import '../pages/home.css';
import axios from "axios";
import ChildRecord from "./ChildRecord";
import "../pages/home.css"
export default function Records(){
    const token=JSON.parse(localStorage.getItem("trackertoken"));
    const[records,setrecords]=useState([])
   
    const[state,setstate]=useState(0)
    
    useEffect(()=>{
    getdata()
    },[])
    const getdata=async()=>{
        try{
         const res= await axios.get("http://localhost:8080/expense/myexpense",{
            headers:{
                token
            }
         })
         setrecords(res.data)
        }catch(e){
            console.log(e)
        }
    }
    function changebank(i){
    setstate(i)
    }
    return(
        <div className="border recordmain">
       
         <div >
         <ChildRecord ele={records?.[state]?.Categories}/>
         </div>
        </div>
    )
}